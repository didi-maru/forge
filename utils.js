/*
 * This file is part of the Forge Window Manager extension for Gnome 3
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Credits:
 * This file has some code from Dash-To-Panel extension: convenience.js
 * Some code was also adapted from the upstream Gnome Shell source code.
 */

'use strict';

// Gnome imports
const Clutter = imports.gi;
const Gio = imports.gi.Gio;
const Meta = imports.gi.Meta;

// Gnome-shell imports
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

// App imports
const Logger = Me.imports.logger;
const Tree = Me.imports.tree;

/**
 *
 * Turns an array into an immutable enum-like object
 *
 */
function createEnum(anArray) {
    const enumObj = {};
    for (const val of anArray) {
        enumObj[val] = val;
    }
    return Object.freeze(enumObj);
}

function resolveX(action, metaWindow) {
    let metaRect = metaWindow.get_frame_rect();
    let monitorRect = metaWindow.get_work_area_current_monitor();
    let val = metaRect.x;
    let x = action.x;
    switch (typeof x) {
        case 'string': //center,
            switch (x) {
                case 'center':
                    val = (monitorRect.width * 0.5) - (this.resolveWidth(action, metaWindow) * 0.5);
                    break;
                case 'left':
                    val = 0;
                    break;
                case 'right':
                    val = monitorRect.width - this.resolveWidth(action, metaWindow);
                    break;
                default:
                    break;
            }
            break;
        case 'number':
            val = x;
            break;
        default:
            break;
    }
    val = monitorRect.x + val;
    Logger.debug(`resolve x: ${val}`);
    return val;
}

function resolveY(action, metaWindow) {
    let metaRect = metaWindow.get_frame_rect();
    let monitorRect = metaWindow.get_work_area_current_monitor();
    let val = metaRect.y;
    let y = action.y;
    switch (typeof y) {
        case 'string': //center,
            switch (y) {
                case 'center':
                    val = (monitorRect.height * 0.5) - (this.resolveHeight(action, metaWindow) * 0.5);
                    break;
                case 'top':
                    val = 0;
                    break;
                case 'bottom': // inverse of y=0
                    val = monitorRect.height - this.resolveHeight(action, metaWindow);
                    break;
                default:
                    break;
            }
            break;
        case 'number':
            val = y;
            break;
        default:
            break;
    }
    val = monitorRect.y + val;
    Logger.debug(`resolve y: ${val}`);
    return val;
}

function resolveWidth(action, metaWindow) {
    let metaRect = metaWindow.get_frame_rect();
    let monitorRect = metaWindow.get_work_area_current_monitor();
    let val = metaRect.width;
    let width = action.width;
    switch (typeof width) {
        case 'number':
            if (Number.isInteger(width) && width != 1) {
                val = width;
            } else {
                let monitorWidth = monitorRect.width;
                val = monitorWidth * width;
            }
            break;
        default:
            break;
    }
    Logger.debug(`resolve width: ${val}`);
    return val;
}

function resolveHeight(action, metaWindow) {
    let metaRect = metaWindow.get_frame_rect();
    let monitorRect = metaWindow.get_work_area_current_monitor();
    let val = metaRect.height;
    let height = action.height;
    switch (typeof height) {
        case 'number':
            if (Number.isInteger(height) && height != 1) {
                val = height;
            } else {
                let monitorHeight = monitorRect.height;
                val = monitorHeight * height;
            }
            break;
        default:
            break;
    }
    Logger.debug(`resolve height: ${val}`);
    return val;
}

function orientationFromDirection(direction) {
    return (direction === Meta.MotionDirection.LEFT ||
        direction === Meta.MotionDirection.RIGHT) ?
        Tree.ORIENTATION_TYPES['HORIZONTAL'] :
        Tree.ORIENTATION_TYPES['VERTICAL'];
}

function orientationFromLayout(layout) {
    switch(layout) {
        case Tree.LAYOUT_TYPES['HSPLIT']:
            return Tree.ORIENTATION_TYPES['HORIZONTAL'];
        case Tree.LAYOUT_TYPES['VSPLIT']:
            return Tree.ORIENTATION_TYPES['VERTICAL'];
        default:
            break;
    }
}

function positionFromDirection(direction) {
    return (direction === Meta.MotionDirection.LEFT ||
        direction === Meta.MotionDirection.UP) ? 
        Tree.POSITION['BEFORE'] : Tree.POSITION['AFTER'];
}

function resolveDirection(directionString) {
    if (directionString) {
        directionString = directionString.toUpperCase();

        if (directionString === "LEFT") {
            return Meta.MotionDirection.LEFT;
        }

        if (directionString === "RIGHT") {
            return Meta.MotionDirection.RIGHT;
        }

        if (directionString === "UP") {
            return Meta.MotionDirection.UP;
        }

        if (directionString === "DOWN") {
            return Meta.MotionDirection.DOWN;
        }
    }

    return null;
}

function rectContainsPoint(rect, pointP) {
    return rect.x <= pointP[0] && pointP[0] <= rect.x + rect.width &&
        rect.y <= pointP[1] && pointP[1] <= rect.y + rect.height;
}

function directionFromGrab(grabOp) {
    if (grabOp === Meta.GrabOp.RESIZING_N || grabOp === Meta.GrabOp.RESIZING_S) {
        return Tree.ORIENTATION_TYPES['VERTICAL'];
    } else if (grabOp === Meta.GrabOp.RESIZING_E || Meta.GrabOp.RESIZING_W) {
        return Tree.ORIENTATION_TYPES['HORIZONTAL'];
    }
    return Tree.ORIENTATION_TYPES['NONE'];
}

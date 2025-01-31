# Forge

Forge is a GNOME Shell extension that provides tiling/window management.

## Extensions
You can install from: https://extensions.gnome.org/extension/4481/forge/ or download the source and `make install`, restart gnome-shell after or `make dev`.

## ! Development is now towards GNOME-4x !
The `main` branch contains gnome-4x code.
The `legacy` and `gnome-3-36` are the same and is now the source for gnome-3x.

## ! Major Changes !
- BREAKING styles: [#63](https://github.com/jmmaranan/forge/issues/63)
  - New Tabbed Tiling implementation via St.Widgets.
  - New style declarations will reset the custom stylesheets for users when updating. Old styles will be backed up as $HOME/.config/forge/stylesheet/forge/stylesheet.css.bak. User has to re-apply colors for now via preferences.

## Features
- Tree-based tiling with vertical and horizontal split containers similar to i3-wm
- Vim-like keybindings for navigation/swapping windows/moving windows in the containers
- Drag and drop tiling
- Support for floating windows, smart gaps and focus hint
- Customizable shortcuts in extension preferences
- Some support for multi-display
- Tiling support per workspace
- Update hint color scheme from Preferences
- Stacked tiling layout
- Works on GNOME 3.36+ (feature-freeze) and 40. X11 and Wayland
- Swap current window with the last active window

## Experimental Features
- New Tabbed tiling implementation using St.Widget library - there is NO fallback to the old implementation.

![image](https://user-images.githubusercontent.com/348125/146386593-8f53ea8b-2cf3-4d44-a613-bbcaf89f9d4a.png)

## Forge Keybinding Defaults

| Action | Shortcut |
| --- | --- |
| Open preferences | `<Super> + period` |
| Toggle tiling mode |`<Super> + w` |
| Toggle floating for active window | `<Super> + c` |
| Focus left | `<Super> + h` |
| Focus right | `<Super> + l` |
| Focus up | `<Super> + k` |
| Focus down | `<Super> + j` |
| Swap current window with last active | `<Super> + Return` |
| Swap active window left | `<Ctrl> + <Super> + h` |
| Swap active window right | `<Ctrl> + <Super> + l` |
| Swap active window up | `<Ctrl> + <Super> + k` |
| Swap active window down | `<Ctrl> + <Super> + j` |
| Move active window left | `<Shift> + <Super> + h` |
| Move active window right | `<Shift> + <Super> + l` |
| Move active window up | `<Shift> + <Super> + k` |
| Move active window down | `<Shift> + <Super> + j` |
| Split container horizontally | `<Super> + z` |
| Split container vertically | `<Super> + v` |
| Toggle split container | `<Super> + g` |
| Gap increase | `<Ctrl> + <Super> + Plus` |
| Gap decrease | `<Ctrl> + <Super> + Minus` |
| Toggle focus hint | `<Super> + x` |
| Toggle active workspace tiling | `<Shift> + <Super> + w` |
| Toggle stacked layout | `<Shift> + <Super> + s` |
| Toggle tabbed layout | `<Shift> + <Super> + t` |
| Activate tile drag-drop | `Start dragging - Mod key configuration in prefs` |

For any conflicts, the user has to manually configure those for now from the
`GNOME Control Center > Keyboard > Customize Shortcuts`. https://github.com/jmmaranan/forge/issues/37

## GNOME Defaults

GNOME Shell has built in support for workspace management and seems to work well - so Forge will not touch those.

User is encouraged to bind the following:
- Switching/moving windows to different workspaces
- Switching to numbered, previous or next workspace

## Contributing

- Please be nice, friendly and welcoming on discussions/tickets.
- Run `make dev` for local development.
- See existing [issues](https://github.com/jmmaranan/forge/issues) or file a new ticket with title `bug: short description` if it doesn't exist.
- See [planned features/milestones](https://github.com/jmmaranan/forge/milestones) or file a new feature request with title `feat: short description` if it doesn't exist.
- Support GNOME 3.36+ to 40. New features/fixes to land on `main` branch _which_ contains gnome-shell running Ubuntu LTS (3.36.x). `gnome-40` will be patched/rebased from `main` unless gnome 40 specific.

## Credits

Thank you to: 
- Michael Stapelberg/contributors for i3.
- System76/contributors for pop-shell.
- ReworkCSS/contributors for css-parse/css-stringify.

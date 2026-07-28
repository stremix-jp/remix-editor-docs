# FAQ (Frequently Asked Questions)

## Basic Questions

### Q: What can remix-editor do?

remix-editor is a web application for visually editing time-based value changes (curves) and controlling Bluetooth-compatible devices.

Main uses:
- Creating device control patterns synchronized to audio
- Editing Funscript files
- Modifying and adjusting existing patterns

### Q: Which browsers are supported?

Modern browsers are supported:
- Google Chrome (recommended)
- Firefox
- Microsoft Edge
- Safari

**Note**: Internet Explorer is not supported.

### Q: Is installation required?

No, it's a web application so no installation is needed. Just access the URL in your browser.

### Q: Is a login required?

No. remix-editor on its own has no login feature; you can start using it right away. Only when it is opened with a dedicated URL from the CMS or similar does it load data from the backend and show a save button.

### Q: Where is data saved?

Data is saved in the browser's LocalStorage and IndexedDB. Edits are always auto-saved even without a "save" action. In local mode, data is never sent to a server.

## Audio Related

### Q: Audio file won't load

Check the following:
1. Is it a supported format? (MP3, WAV, M4A, OGG, FLAC, AAC, WebM)
2. **Does the file exceed 100MB?** (larger files cannot be loaded)
3. Is the file corrupted?

### Q: Audio won't play

Check the following:
1. Is the browser muted?
2. Is the remix-editor volume slider at 0?
3. System volume settings

### Q: Only the audio disappears after a reload

Files larger than **Settings > General > Audio Cache Limit** (default 50MB) are not stored, so they disappear on reload. Raise the limit, or load the file again each time. Setting the limit to `0` disables the cache (it does not mean unlimited).

### Q: Audio waveform not showing

Background waveform display may be disabled:
1. Open **Settings > Editor**
2. Enable "Show Waveform Background"

### Q: I loaded audio and was asked to "Adjust Remix Length"

This appears when the audio length and the Remix max time differ by 3 seconds or more. "Adjust" matches the max time to the audio. When shortening, the number of points that will be deleted is warned about first, so check it before executing.

## Editing Related

### Q: Can't add points

Check the following:
1. Is the pattern visible? (eye icon; a toast warning appears while hidden)
2. Are you clicking outside the endpoints (0 sec and max time)? (points cannot be added outside the range)

### Q: Can't delete start/end points

The start point (0 sec) and end point (max time) are protected and cannot be deleted. Their time is fixed and only the value can be changed.

### Q: Undo doesn't work

Check the following:
1. Are you in text input mode? (finish input first)
2. Is the history empty? (you cannot return past the initial state)

Note that Redo is **Ctrl + Shift + Z**. Ctrl + Y is not assigned.

### Q: Pressing a shortcut does nothing

Copy/paste, delete, select all, zoom, waveform generation, the J/F keys, and others only work **while the Curve Editor panel is active**. Click the curve editor and try again. See [Shortcuts](./09-shortcuts.md) for details.

### Q: Edited data disappeared

- Data cannot be recovered if browser data was cleared
- Data is not saved in private browsing mode
- We recommend regularly exporting important data

## Playback Related

### Q: I can no longer select 4x or 8x speed

Playback speed has seven steps: 0.25x / 0.5x / 0.75x / 1x / 1.25x / 1.5x / 2x. Excessively fast playback does not work well with device control, so it was removed.

### Q: I want to specify the loop range

If there is a selection, that range loops; otherwise the whole timeline (audio length, or max time) loops. Select a range in the curve editor before enabling the loop button.

## Device Related

### Q: Can't connect to Intiface Central

Check the following:
1. Is Intiface Central running?
2. Is the server started?
3. Is the Intiface server URL in **Settings > Device** correct? (default: `ws://localhost:12345`)
4. Is a firewall blocking it?

### Q: Device not found

Device scanning is done in Intiface Central. remix-editor has no scan button.

1. Is the device powered on?
2. Is the device in pairing mode?
3. Is Bluetooth enabled?
4. Is the device recognized in Intiface Central?

### Q: I hid the pattern but the device keeps moving

The eye icon (show/hide) only toggles the canvas display. To stop output to devices, disable output with the pattern's **power icon**.

### Q: Device response is slow

Due to Bluetooth characteristics, about 50-100ms latency is normal. If latency is high:
1. Move the device closer to the PC
2. Reduce other Bluetooth devices
3. Compensate with **Settings > Playback > Playhead Offset** (default 0.2 sec)

### Q: Device stops midway

Check the following:
1. Device battery level
2. Bluetooth connection status
3. Is Intiface Central running stably?

## File Related

### Q: Can't load Funscript file

Check the following:
1. Is the file extension `.funscript`?
2. Is the file content valid JSON format?
3. Are the required fields (actions) included?

### Q: An error appears when I try to export

If 「優先アクチュエータータイプが未設定のパターンがあります」 (some patterns have no preferred actuator type set) is shown, the "Preferred Actuator" in the pattern settings is unset. Set it for every pattern and export again. Export is also not possible when there are no patterns at all.

> Export error messages are hardcoded and **appear in Japanese regardless of the language setting**.

### Q: Exported file won't open in other software

remix-editor's export format is the proprietary `.remix.json` format. Convert to a format the other software supports.

### Q: Can old version files be used?

Files created with remix-editor v1 can be loaded. However, saving in v2 format means they can't be opened in v1.

## Performance Related

### Q: Running slowly

Try the following:
1. Reduce the background waveform sample count (**Settings > Editor**)
2. Reduce the number of visible patterns
3. Close other browser tabs
4. Restart the browser

### Q: Browser crashes

When handling large numbers of points (tens of thousands+), memory may run out. Reduce points or split patterns.

## Other

### Q: Want to reset settings or data

You can clear data per category — Waveform Data / Audio Data / Section Data / Settings / All Data — from **Settings > General > Data Management**.

**Note**: This operation cannot be undone. The page reloads automatically after clearing. Export necessary data beforehand.

### Q: I want to use the experimental actuators

Enabling **Settings > General > Experimental Mode** adds Oscillate, Constrict, Inflate, Position, Spray, Temperature, and LED to "Preferred Actuator". Depending on what the device itself supports, these may not behave as expected.

### Q: Can multiple patterns be sent to the same device?

No, only one pattern can be connected to one actuator. Actuators that are already connected are grayed out and show the name of the connected pattern. Conversely, one pattern can be sent to multiple actuators at the same time.

### Q: Can it work offline?

After initial load, basic functions work offline. However, a network connection is required for the Intiface Central connection.

### Q: Can it be used on smartphone?

It technically works, but is not recommended due to screen size constraints. PC use is recommended.

## Support

### Q: Found a bug

Please report on GitHub Issues. Include the following for faster resolution:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and version
- OS

### Q: Have a feature request

Please propose on GitHub Issues. Note that not all requests can be accommodated.

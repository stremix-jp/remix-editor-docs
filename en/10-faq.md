# FAQ (Frequently Asked Questions)

## Basic Questions

### Q: What can remix-editor do?

remix-editor is a web application for visually editing time-based curves and controlling Bluetooth-compatible devices.

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

### Q: Where is data saved?

Data is saved in the browser's LocalStorage and IndexedDB. Data is never sent to servers.

## Audio Related

### Q: Audio file won't load

Check the following:
1. Is it a supported format? (MP3, WAV, M4A, OGG, FLAC, AAC)
2. Is the file corrupted?

### Q: Audio won't play

Check the following:
1. Is browser muted?
2. Is remix-editor volume slider at 0?
3. System volume settings

### Q: Audio waveform not showing

Background waveform display may be disabled:
1. Open Settings > Audio Settings
2. Enable "Show Background Waveform"

## Editing Related

### Q: Can't add points

Check the following:
1. Is pattern visible? (eye icon)
2. Are you clicking inside selection? (click outside)

### Q: Can't delete start/end points

Start point (time=0) and end point (time=maxTime) are protected and cannot be deleted. Only Y coordinate (value) can be changed.

### Q: Undo doesn't work

Check the following:
1. Are you in text input mode? (finish input first)
2. Is history empty? (can't return to initial state)

### Q: Edited data disappeared

- Data cannot be recovered if browser data was cleared
- Data is not saved in private browsing mode
- We recommend regularly exporting important data

## Device Related

### Q: Can't connect to Intiface Central

Check the following:
1. Is Intiface Central running?
2. Is server started?
3. Is port number correct? (default: 12345)
4. Is firewall blocking?

### Q: Device not found

Check the following:
1. Is device powered on?
2. Is device in pairing mode?
3. Is Bluetooth enabled?
4. Is device recognized in Intiface Central?

### Q: Device response is slow

Due to Bluetooth characteristics, about 50-100ms latency is normal. If latency is high:
1. Move device closer to PC
2. Reduce other Bluetooth devices
3. Compensate with playheadOffset

### Q: Device stops midway

Check the following:
1. Device battery level
2. Bluetooth connection status
3. Is Intiface Central running stably?

## File Related

### Q: Can't load Funscript file

Check the following:
1. Is file extension `.funscript`?
2. Is file content valid JSON format?
3. Are required fields (actions) included?

### Q: Exported file won't open in other software

remix-editor's export format is proprietary `.remix.json` format. Convert to compatible format for use with other software.

### Q: Can old version files be used?

Files created with remix-editor v1 can be loaded. However, saving in v2 format means they can't be opened in v1.

## Performance Related

### Q: Running slowly

Try the following:
1. Reduce background waveform samples
2. Reduce number of visible patterns
3. Close other browser tabs
4. Restart browser

### Q: Browser crashes

When handling large numbers of points (tens of thousands+), memory may run out. Reduce points or split patterns.

## Other

### Q: Want to reset settings

Settings > Advanced Settings > "Clear Work Data" returns to initial state.

**Note**: This operation deletes all data. Export necessary data beforehand.

### Q: Can multiple patterns be sent to same device?

No, only one pattern can be connected to one actuator. Attempting to connect multiple patterns shows as conflict.

### Q: Can it work offline?

After initial load, basic functions work offline. However, network connection is required for Intiface Central connection.

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

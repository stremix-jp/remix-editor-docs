# Playback

In remix-editor, you can preview patterns while playing audio. When devices are connected, they are controlled in real time.

## Loading Audio Files

### Drag and Drop

1. Drag an audio file onto the media area in the footer
2. Drop to load

Audio files are loaded no matter where in the application you drop them.

### File Selection

1. Click the media area
2. Select from the file dialog

You can also load a file from **File > Load Audio...** in the menu.

### Supported Formats

| Format | Extension |
|--------|-----------|
| MP3 | .mp3 |
| WAV | .wav |
| M4A | .m4a |
| OGG | .ogg |
| FLAC | .flac |
| AAC | .aac |
| WebM | .webm |

**The file size limit is 100MB.** Larger files show "File too large (max 100MB)" and are not loaded.

### Auto-Restore

Loaded audio files are stored in the browser (IndexedDB) and automatically restored on next launch.

However, files larger than **Settings > General > Audio Cache Limit** (default 50MB) are not stored and disappear on reload. Setting the limit to `0` disables the cache (it does not mean unlimited).

### Adjusting the Remix Length

If the loaded audio length and the Remix max time differ by 3 seconds or more, the "Adjust Remix Length" dialog appears.

- **Adjust**: extends/shortens the max time to match the audio length
- **Don't Adjust**: keeps the current max time

When shortening, the number of points that will be deleted is shown as a warning.

## Playback Controls

Operate from the transport in the footer.

| Button | No sections | With sections |
|--------|-------------|---------------|
| Leftmost | Skip to Start | Previous Section |
| Center | Play / Pause | Play / Pause |
| Center right | Play from Selection | Play from Selection |
| Rightmost | Skip to End | Next Section |

### Play/Pause

- **Space** key or play button
- Press during playback to pause
- Press while paused to resume

### Seek (Move Playback Position)

- Drag the seek bar in the footer (**snaps to the time step**)
- Click / drag the playhead area of the curve editor
- Click a row in the section table (moves to the start of that section)

## Playback Speed

### Change Speed

Click the speed display in the footer to select from the speed list.

| Speed | Use Case |
|-------|----------|
| 0.25x | Detailed checking |
| 0.5x | Slow playback |
| 0.75x | Slightly slower |
| 1x | Normal speed |
| 1.25x | Slightly faster |
| 1.5x | Faster |
| 2x | Double speed |

### Shortcuts

- **Shift + >**: Increase Speed (cycles)
- **Shift + <**: Decrease Speed (cycles)

Wraps at max/min.

## Volume

### Volume Adjustment

- Adjust 0% to 100% with the volume slider
- Mute button for instant silence

## Loop Playback

### Loop Mode

Click the loop button to enable loop playback (the button is highlighted while enabled).

### Loop Range

| Condition | Loop Range |
|-----------|------------|
| Selection exists | Selection |
| No selection | Whole timeline (audio length, or max time) |

While looping, playback automatically returns to the start position when reaching the end.

## Pivot Function

A pivot is like a "favorite position". It remembers positions you return to frequently. **Multiple pivots** can be registered.

### Add a Pivot

- Press the **P** key
- The current playback position is **added** as a pivot (existing pivots are kept)
- No pivot is added at a nearly identical position (within ±0.001 sec)

To remove pivots, use the curve editor toolbar, or the context menu items "Remove Pivot" / "Remove Pivots in Selection".

### Moving Between Pivots

| Key | Action |
|-----|--------|
| Shift + P | Jump to Next Pivot (wraps to the first after the last) |
| Ctrl + Shift + P | Jump to Previous Pivot (wraps to the last before the first) |
| Ctrl + P | Move the playback position to the selected pivot |

### Moving by Dragging

Pivots shown in the playhead area of the curve editor can be repositioned by dragging.

### Persistence

Pivot positions are automatically saved and maintained on next launch. They are covered by Undo and are also saved in the Remix file.

## Playback Position Operations

### Jump to Playhead

- **J** key
- Viewport moves to current playback position
- Useful when you lose track of the playback position while editing

### Follow Playhead

- **F** key, or toggle from the curve editor toolbar
- When enabled, the viewport scrolls automatically with playback
- Disabled by default. Can also be changed in **Settings > Playback > Follow Playhead**

### Jumping to Points

| Key | Action |
|-----|--------|
| Alt + → | Move the playback position to the next point |
| Alt + ← | Move the playback position to the previous point |
| N | Select the next point |
| B | Select the previous point |

### Drag Playhead

Drag the playhead area at the top of the curve editor to change the playback position.

### Playhead Offset

You can set an offset between the audio and the timing of what is sent to devices.

- Default: **0.2 sec**
- Range: -1 second to +1 second (positive values make the device lead, negative values delay it)
- Use: Compensate for device response delay

Change it in **Settings > Playback > Playhead Offset**.

## Selection Playback

### Play from Selection

1. Select a range in the curve editor
2. Click the "Play from Selection" button in the footer
3. Playback starts from the selection start position

The button is disabled when there is no selection.

### Play from Section

Clicking a row in the section table sets the curve editor selection to that section and moves the playback position to the start of the section at the same time. From there, press Space to play.

See [Sections](./05-sections.md) for details.

## Background Waveform Display

Display the audio waveform in the curve editor background.

### Settings

1. Open **Settings > Editor**
2. Enable "Show Waveform Background" (enabled by default)

### Adjustment Items

| Setting | Description | Default |
|---------|-------------|---------|
| Auto Scale Waveform | Automatically scale to the maximum value on screen | Enabled |
| Waveform Scale | Waveform height (%) | 50% |
| Waveform Sample Count | Waveform resolution (50 - 4000) | 2000 |

Increasing samples shows more detail but increases processing load.

## Throttle Control

Feature to input values in real time during playback. It is operated from the dedicated "Throttle Control" panel.

In the default layout it is a tab in the same group as "Waveform Library". If you closed the panel, reopen it with **View > Panels > Throttle Control**.

### Usage

1. Select the active pattern
2. Start playback
3. Grab and drag the vertical slider

- One point is added at the current playback position the moment you grab the slider
- **Only during playback**, the dragged value is recorded continuously at time step intervals
- Values are treated as a ratio from 0 to 1 and recorded multiplied by the pattern's max value
- Releasing the drag groups the whole recording into a single Undo step

Useful for live input.

## Device Synchronization

During playback, pattern values are automatically sent to connected devices. The pattern's **output must be enabled** (power icon).

### Differences by Actuator Type

| Type | Behavior |
|------|----------|
| Vibrate | Immediate control (value directly becomes intensity) |
| Rotate | Immediate control (positive/negative changes rotation direction) |
| Linear | Position-based (takes time to move to the specified position) |

## Troubleshooting

### Audio Not Playing

1. Check browser mute
2. Check volume slider
3. Confirm file is a supported format
4. Confirm the file size does not exceed 100MB

### Audio Disappeared After Reload

Files larger than **Settings > General > Audio Cache Limit** (default 50MB) are not stored. Raise the limit, or load the file again each time.

### Playback Stuttering

1. Reduce background waveform sample count
2. Close other tabs
3. Restart browser

### Device and Audio Out of Sync

1. Adjust **Settings > Playback > Playhead Offset**
2. Check device delay characteristics

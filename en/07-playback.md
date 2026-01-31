# Playback

In remix-editor, you can preview patterns while playing audio. When devices are connected, they are controlled in real-time.

## Loading Audio Files

### Drag and Drop

1. Drag audio file to audio area in footer
2. Drop to load

### File Selection

1. Click audio area
2. Select from file dialog

### Supported Formats

| Format | Extension |
|--------|-----------|
| MP3 | .mp3 |
| WAV | .wav |
| M4A | .m4a |
| OGG | .ogg |
| FLAC | .flac |
| AAC | .aac |

### Auto-Restore

Loaded audio files are saved in the browser and automatically restored on next launch.

## Playback Controls

### Play/Pause

- **Space** key or play button
- Press during playback to pause
- Press while paused to resume

### Stop

- Click stop button
- Playback stops and position returns to start

### Seek (Move Playback Position)

- Click on audio waveform
- Drag playhead area on curve editor
- Move to any position

## Playback Speed

### Change Speed

Change with speed selector in footer.

| Speed | Use Case |
|-------|----------|
| 0.25x | Detailed checking |
| 0.5x | Slow playback |
| 1x | Normal speed |
| 1.5x | Slightly faster |
| 2x | Double speed |
| 4x | High-speed checking |
| 8x | Ultra-high-speed checking |

### Shortcuts

- **Shift + >**: Speed up (cycles)
- **Shift + <**: Speed down (cycles)

Wraps at max/min.

## Volume

### Volume Adjustment

- Adjust 0% to 100% with volume slider
- Mute button for instant silence

## Repeat Playback

### Repeat Mode

Click repeat button to enable loop playback.

### Loop Range

| Condition | Loop Range |
|-----------|------------|
| Selection exists | Selection |
| No selection | Current viewport range |

During repeat, playback automatically returns to start when reaching end.

## Pivot Function

Pivot is like a "favorite position". Remember frequently accessed positions.

### Set Pivot

- Press **P** key
- Current playback position is saved as pivot
- Press **P** again to clear (toggle behavior)

### Jump to Pivot

- **Shift + P**
- Viewport moves to pivot position

### Move Playback to Pivot

- **Ctrl + P**
- Playback position moves to pivot position

### Persistence

Pivot position is automatically saved and maintained on next launch.

## Playback Position Operations

### Jump to Playback Position

- **J** key
- Viewport moves to current playback position
- Useful when you lose track of playback position while editing

### Drag Playhead

Drag the playhead area at top of curve editor to change playback position.

### playheadOffset (Playback Position Offset)

Set offset between audio and curve editor timing.

- Range: -1 second to +1 second
- Use: Compensate for device response delay

Change in Settings > Audio Settings.

## Selection Playback

### Play from Selection Start

1. Select range in curve editor
2. Click "Play from Start" button in footer
3. Playback starts from selection start position

### Play from Section

1. Select section in section panel
2. "Set as Selection" to reflect in curve editor selection
3. "Play from Start" to play

## Background Waveform Display

Display audio waveform in curve editor background.

### Settings

1. Open Settings > Audio Settings
2. Enable "Show Background Waveform"

### Adjustment Items

| Setting | Description | Range |
|---------|-------------|-------|
| Waveform Scale | Waveform height | 10% - 100% |
| Waveform Samples | Waveform resolution | 50 - 4000 |

Increasing samples shows more detail but increases processing load.

## Throttle Control

Feature to input values in real-time during playback.

### Enable

1. Open Settings > Advanced Settings
2. Turn on "Enable Throttle Control"

### Usage

1. Start playback
2. Operate vertical slider
3. Values are recorded as points in real-time

Useful for live input.

## Device Synchronization

During playback, pattern values are automatically sent to connected devices.

### Send Timing

- During playback: Update devices at about 60fps
- While paused: Device maintains current position value

### Differences by Actuator Type

| Type | Behavior |
|------|----------|
| Vibrate | Immediate control (value directly becomes intensity) |
| Rotate | Immediate control (positive/negative changes direction) |
| Linear | Position-based (moves on drag end) |

## Troubleshooting

### Audio Not Playing

1. Check browser mute
2. Check volume slider
3. Confirm file is supported format

### Playback Stuttering

1. Reduce background waveform samples
2. Close other tabs
3. Restart browser

### Device and Audio Out of Sync

1. Adjust playheadOffset
2. Check device delay characteristics

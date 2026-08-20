# Waveform Generation

Instead of placing points by hand, these helper features automatically generate a waveform in the selected time range. Use them to quickly draft routine waveforms.

There are 3 generation methods.

| Method | Source | Description |
|--------|--------|-------------|
| [Waveform Generator Panel](#waveform-generator-panel) | Waveform type and parameters | Procedurally generate sine, triangle, and other waves |
| [Audio-Based Waveform Generation](#audio-based-waveform-generation) | Audio volume | Convert volume changes into a waveform |
| [Generating Waveforms from Sections](./08-sections.md#generating-waveforms-from-sections) | The `_params` columns of sections | Generate in one go from per-interval intensity values |

## Waveform Generator Panel

![Waveform Generator](./images/07-waveform-generator.png)

### Steps

1. **Select a time range** (Shift + drag, or select 2 or more points)
2. Press the **W** key (or right-click > Generate Waveform) to open the Waveform Generator panel
3. Press the panel's "Generate Waveform" button to start the **preview**
4. Changing a parameter updates the preview on the canvas in real time
5. Press "Apply" to commit when you are satisfied ("Cancel" discards the preview)

**Note**: Generation is not possible unless a time range is selected.

### Waveform Types and Parameters

| Type | Type-specific parameters |
|------|--------------------------|
| Sine Wave | Point Interval (0.05-1 sec) |
| Triangle Wave | Peak Position (0.01-0.99) |
| Triangle (Slope) | Min Value / Max Value / Slope (0.1-20 unit/sec) |
| Square Wave | None |
| Random Wave | Point Interval (0.05-1 sec) |

The common parameters are as follows.

| Parameter | Description |
|-----------|-------------|
| Amplitude | Height of the wave |
| Frequency | Density of the wave (0.1-10) |
| Phase | Offset of the wave's start position |
| Offset | Vertical position of the whole wave (0-1) |

**Triangle (Slope)** works differently from the other types: instead of a frequency, you specify the speed of the wave as a slope, "how many units it moves per second". It is convenient when you want to match a device's tracking speed.

### Align Frequency with Real Time

When checked, frequency is treated as "waves per second" instead of "waves within the selection".

### Behavior on Apply

- Existing points inside the range are deleted (the endpoints at time = 0 and max time remain)
- Generated values are quantized to the Step and clamped to the min/max value range
- Points that are too close in time to an existing point (within half of the time step) are skipped
- The whole apply is grouped as a single Undo step
- After applying, the generated points are selected

## Audio-Based Waveform Generation

You can automatically generate a waveform by analyzing audio volume.

### Steps

1. Select a time range
2. Press the **A** key (or right-click > Generate from Audio) to open the panel
3. Press the "Generate Waveform" button to start the preview and adjust the parameters
4. Press "Apply" to commit

If no audio is loaded, the generate button is disabled.

### Parameters

| Parameter | Description |
|-----------|-------------|
| Threshold | Specified from 0 to 1. It is a ratio against the maximum volume; volume below it becomes value 0 |
| Point Interval | Specified as a **multiple of the time step** (an integer from 1 to 20). E.g. time step 0.1 sec x 20 = every 2 seconds |

### Using a Different Audio File

With "Select audio file" you can analyze a file other than the audio you currently have loaded. This lets you do things like analyzing only a sound-effects track to build a vibration pattern.

## Device-Specific Waveform Tips

### Linear Devices (A10 Piston, The Handy, etc.)

- **Use simple waveforms**: Up-and-down motion such as a triangle wave is the basis
- **Avoid complex shapes**: Complex waveforms make device movement jerky
- **Rest position**: The initial and rest positions are best at the top (value = max value)

### Vibration Devices (Anal plugs, etc.)

- **Rest position**: The initial and rest positions are best at the bottom (value = 0)
- **Triangle / sine waves**: Use them to express piston-like motion

### Rotation Devices (Nipple machines, etc.)

- **Allow negative values**: Enable "Allow Negative Values" to switch the direction of rotation
- **Positive = clockwise, negative = counter-clockwise**
- **Separate left/right control**: Setting different waveforms for left and right increases immersion

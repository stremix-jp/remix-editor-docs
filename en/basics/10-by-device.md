# 10. Basics by Device Type

Finally, here is how **pattern settings and waveform building change by device type**. This is the starting point for applying the nine lessons of operations to real production.

## How the three motions differ

| Motion (preferred actuator) | What the value means | Idle position | Basic waveform |
|-----------------------------|----------------------|---------------|----------------|
| **Linear** (piston) | Sleeve position. Top (max value) is withdrawn, 0 is deepest | **Top (max value)** | Triangle wave. Keep the up-and-down simple |
| **Vibrate** | Motor strength. 0 is off | **0** | Vary strength and period with the audio |
| **Rotate** | Rotation speed. Positive = clockwise, negative = counter-clockwise | **0** | Allow negative values and use direction changes too |

## Linear (piston type: A10 Piston, The Handy, etc.)

- Keep the waveform a **simple triangle**. Only a peak and a trough per stroke. Extra points along a slope make the device decelerate at each one and stutter
- In ranges with no motion (dialogue, lead-in), draw a **flat line at the top (max value)**. Stopping at 0 means "stopped while inserted"
- For a fast tempo, **narrow the amplitude** as well as raising the frequency so the device can keep up

## Vibrate (anal, nipple, etc.)

- Idle is **0**. Separate clearly the ranges that vibrate from the ranges that stop
- In scenes with a toy in use, vary strength and period with the audio. To follow a piston tempo, use a triangle or sine wave
- Do not leave it buzzing constantly

## Rotate (nipple, etc.)

- Turn **"Allow negative values" ON** in the pattern settings
- Swinging between positive and negative reverses the direction and adds variety
- Give left and right devices **separate patterns** with staggered timing or amplitude for a livelier feel. Do not make them identical copies

## The flow for finishing one Remix

Rearranging the course into the order of actual production:

1. Open the editor and confirm the audio and sections are loaded (lesson 1)
2. Create the needed patterns and set name, preferred device, and preferred actuator. Allow negative values only for rotation (lesson 4)
3. Listen through while reading the sections and note scenes with motion and the climax (lessons 3 and 5)
4. Click each scene's section row and lay a triangle wave or similar (lesson 6)
5. Align motion starts and ends and add intensity changes within scenes (lesson 7)
6. Play through to check, and clear red segments with speed coloring (lesson 8)
7. Save (lesson 9)

## From here

You can now build a Remix. Detailed feature descriptions, the shortcut list, and troubleshooting are in the [Reference](../README.md#reference). The three most used:

- [Curve Editor](../06-curve-editor.md): pivots, throttle control, the context menu, and other operations not covered here
- [Waveform Generation](../09-waveform-generation.md): waveform type details, generation from audio, generation from sections
- [Shortcuts](../11-shortcuts.md): key bindings and customization

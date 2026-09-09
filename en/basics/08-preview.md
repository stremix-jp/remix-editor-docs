# 8. Previewing

Check that the curve matches the audio and that it does not ask the device for impossible motion. Most of this can be confirmed on screen without a real device.

## Checking on screen

1. Click the section row for the scene you want to check to cue it up
2. Turn on loop in the footer and repeat that range
3. If start / end timing is in question, drop the playback speed to 0.5x

During playback the playhead in the curve editor shows the current position, and the **current value** appears under each pattern name in the Patterns panel.

## Finding motion that is too fast (speed coloring)

Turn on the speedometer icon in the curve editor toolbar and each segment of the curve is colored **from blue (slow) to red (fast) by how quickly the value changes**.

- Segments leaning red may be beyond what the device can follow
- Lower the triangle wave frequency or narrow the amplitude to reduce warm colors

Limits differ by device model. The threshold used as the reference can be changed under Settings > Curve Editor.

## Checking with a real device (optional)

A real device raises the precision of the final check. Connection requires the device bridge software [Intiface Central](https://intiface.com/central/).

1. Launch Intiface Central and start its server
2. remix-editor tries to connect automatically on startup. If it does not, choose **Device > Connect...** from the menu
3. Connected devices appear in the Devices panel
4. Devices are assigned automatically from each pattern's preferred device × preferred actuator (set in lesson 4)
5. Press play and the pattern values are sent to the devices

If a device does not respond, check that the pattern's **power icon (output)** is ON. Conversely, turn the power OFF on a pattern you want to silence for a moment.

If the device feels out of sync with the audio, **Settings > Playback > Playhead Offset** (default 0.2 s) shifts the send timing forward or back.

See the [Reference on devices](../05-devices.md) for connection details.

## What to do in this lesson

Play the whole thing at 1x and confirm the curve keeps up with how the audio develops. Loop any scene that bothers you and fix it with the lesson 7 operations. Turn on speed coloring and make sure no red segments remain.

## Next

[9. Saving](./09-save.md)

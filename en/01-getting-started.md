# Getting Started

This guide explains the basic usage of remix-editor.

## Opening the Application

1. Access the remix-editor URL in your browser
2. On first launch there are no patterns at all. Create one pattern first

No installation or account registration is required. Everything runs in the browser.

## Basic Workflow

### 1. Load an Audio File

You can load audio in any of the following ways.

- Drag and drop an audio file onto the media drop zone in the **footer**
- Click the drop zone and pick a file from the file selection dialog
- Select **File > Load Audio...** from the menu

Audio, Remix JSON, Funscript, and CSV files are accepted **anywhere in the app**. The format is detected automatically and the matching dialog opens.

Supported formats: MP3, WAV, M4A, OGG, FLAC, AAC

**The file size limit is 100MB.** Larger files cannot be loaded.

If the loaded audio length differs from the Remix max time by 3 seconds or more, the "Adjust Remix Length" dialog appears. You can extend or shorten the max time to match the audio (when shortening, the number of points that will be deleted is shown as a warning).

See [Import and Save](./04-import-save.md) for details.

### 2. Create a Pattern

1. Click the "+" button in the **Patterns** panel
2. A new pattern is created and selected automatically
3. Rename the pattern in the "Name" field of its settings

See [Patterns](./03-patterns.md) for details.

### 3. Connect a Device (Optional)

1. Launch [Intiface Central](https://intiface.com/central/)
2. Connect from the **Devices** panel in remix-editor, or from **Device > Connect...** in the menu
3. Connected devices are listed in the Devices panel

Auto Connect is enabled by default, so if you start Intiface Central first, remix-editor connects automatically right after launch.

See [Devices](./05-devices.md) for details.

### 4. Edit the Curve

1. Click in the **Curve Editor** to add points
2. Drag points to move them
3. Select multiple points for batch editing

If you want to tap points in time with the music while playing, the **Quick Point Bar** at the top of the Curve Editor (number keys 1-9) is convenient.

See [Curve Editor](./06-curve-editor.md) for details.

### 5. Play and Preview

1. Press Space or the play button to start playback
2. If devices are connected, they are controlled in real time
3. Playback speed can be changed between 0.25x and 2x

The playback controls are gathered in the footer at the bottom of the screen. See [Display and Layout > Footer](./02-display-layout.md#footer-playback-controls) for details.

### 6. Save

There are two saving systems.

- **Save locally as a file**: Select **File > Save Remix...** (Ctrl + Shift + S) from the menu to download a `.remix.json` file
- **Save directly to the CMS**: When the editor is opened via a dedicated URL issued by the CMS, the "Save" button on screen saves your edits directly to the server

See [Import and Save](./04-import-save.md) for details.

## About Auto-Save

remix-editor has no concept of "saving a document". Your edits are **always saved automatically inside the browser**.

- Patterns, sections, settings, and layout are stored in the browser's local storage
- Loaded audio is stored in IndexedDB and restored automatically the next time you visit

**Note**: Audio larger than the audio cache limit (default 50MB) is not cached. Only the audio is lost when you reload the page, so if you work with large audio files, adjust the limit in Settings > General > Media Cache.

Auto-save is only temporary storage inside the browser. To keep your work for sure, export it as a file with **File > Save Remix...**.

## Next Steps

- [Display and Layout](./02-display-layout.md) - Map of the screen and panel arrangement
- [Curve Editor](./06-curve-editor.md) - Learn editing features in detail
- [Shortcuts](./11-shortcuts.md) - Learn efficient operation methods

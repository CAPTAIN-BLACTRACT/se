# Speak Easy - Voice to Text Recorder

This is a simple and elegant web application for converting speech to text. It allows users to record their voice, see a live transcription, and save the resulting text as notes.

## Features

*   **Voice to Text:** Uses the browser's built-in Speech Recognition API to transcribe speech in real-time.
*   **Save Notes:** Save your transcriptions as notes for later reference.
*   **Local Storage:** Notes are saved in the browser's local storage.
*   **Manage Notes:** View, copy, and delete your saved notes.

## Technology Stack

*   **Framework:** Built with Angular.
*   **State Management:** Uses Angular Signals for reactive state management.
*   **API:** Leverages the `webkitSpeechRecognition` API for speech-to-text functionality.

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli).

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project for production, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

import { asset } from "./asset";

let ctx: AudioContext | null = null;
let muted = false;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ToneOpts = { type?: OscillatorType; gain?: number; attack?: number; glideTo?: number };

function tone(freq: number, at: number, dur: number, { type = "sine", gain = 0.1, attack = 0.01, glideTo }: ToneOpts = {}) {
  const c = audio();
  if (!c) return;
  const t = c.currentTime + at;
  const osc = c.createOscillator();
  const env = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
  env.gain.setValueAtTime(0.0001, t);
  env.gain.linearRampToValueAtTime(gain, t + attack);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(env).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

/** Nota de sino: fundamental + harmônico */
function bell(freq: number, at: number, dur: number, gain = 0.09) {
  tone(freq, at, dur, { gain });
  tone(freq * 2, at, dur * 0.7, { gain: gain * 0.3 });
}

const NOTE = { Bb3: 233.08, Eb4: 311.13, G4: 392, Bb4: 466.16, D5: 587.33, Eb5: 622.25 };

type SoundName = "startup" | "click" | "logoff" | "shutdown" | "minimize" | "restore";

/** Arquivo esperado em /public/sounds (sem extensão) para cada evento */
const FILES: Record<SoundName, string> = {
  startup: "Windows XP Startup",
  click: "Windows Navigation Start",
  logoff: "Windows XP Logoff Sound",
  shutdown: "Windows XP Shutdown",
  minimize: "Windows XP Minimize",
  restore: "Windows XP Restore",
};

const EXTENSIONS = ["flac", "mp3", "wav", "ogg"];
const raw = new Map<SoundName, ArrayBuffer>();
const decoded = new Map<SoundName, AudioBuffer>();

async function fetchFile(name: SoundName) {
  for (const ext of EXTENSIONS) {
    try {
      const res = await fetch(asset(`/sounds/${encodeURIComponent(FILES[name])}.${ext}`));
      if (res.ok && !res.headers.get("content-type")?.includes("text/html")) {
        raw.set(name, await res.arrayBuffer());
        return;
      }
    } catch {
      // arquivo indisponível: usa o som sintetizado (ou fica em silêncio)
    }
  }
}

function startBuffer(c: AudioContext, buffer: AudioBuffer) {
  const src = c.createBufferSource();
  src.buffer = buffer;
  src.connect(c.destination);
  src.start();
}

/** Toca o arquivo de /public/sounds se existir; senão usa o som sintetizado */
function play(name: SoundName, synth?: () => void) {
  if (muted) return;
  const c = audio();
  if (!c) return;
  const ready = decoded.get(name);
  if (ready) return startBuffer(c, ready);
  const data = raw.get(name);
  if (!data) return synth?.();
  c.decodeAudioData(data.slice(0)).then(
    (buffer) => {
      decoded.set(name, buffer);
      startBuffer(c, buffer);
    },
    () => {
      raw.delete(name);
      synth?.();
    },
  );
}

export const sounds = {
  get muted() {
    return muted;
  },
  setMuted(value: boolean) {
    muted = value;
  },
  /** Busca os arquivos de som opcionais em /public/sounds */
  preload() {
    return Promise.all((Object.keys(FILES) as SoundName[]).map(fetchFile));
  },
  shutdown() {
    play("shutdown", () => sounds.logoff());
  },
  minimize() {
    play("minimize");
  },
  restore() {
    play("restore");
  },
  /** Arpejo ascendente que termina num acorde sustentado */
  startup() {
    play("startup", () => {
      [NOTE.Bb3, NOTE.Eb4, NOTE.G4, NOTE.Bb4, NOTE.D5].forEach((f, i) => bell(f, i * 0.2, 1.4));
      [NOTE.Eb4, NOTE.G4, NOTE.Bb4, NOTE.D5].forEach((f) => tone(f, 1.05, 2.6, { type: "triangle", gain: 0.05, attack: 0.15 }));
      bell(NOTE.Eb5, 1.05, 2.4, 0.06);
    });
  },
  /** Notas descendentes */
  logoff() {
    play("logoff", () => [NOTE.Eb5, NOTE.Bb4, NOTE.G4, NOTE.Eb4].forEach((f, i) => bell(f, i * 0.18, 1.1)));
  },
  click() {
    play("click", () => tone(1700, 0, 0.05, { type: "triangle", gain: 0.06, attack: 0.002, glideTo: 900 }));
  },
};

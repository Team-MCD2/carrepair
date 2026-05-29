#!/usr/bin/env python3
"""Télécharge 30 s de chaque vidéo YouTube dans public/videos/."""
import subprocess
import sys
from pathlib import Path

try:
    import imageio_ffmpeg

    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    FFMPEG = "ffmpeg"

VIDEOS = {
    "hero": "CI8aM-MMI0E",
    "pourquoi": "PVRqLIgtZ5o",
    "carrosserie": "FQaYkfmLEUU",
    "achat": "mYMVqLfj3T4",
    "apropos": "eMBlkjCA298",
}

OUT = Path(__file__).resolve().parent.parent / "public" / "videos"
OUT.mkdir(parents=True, exist_ok=True)

FMT = (
    "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/"
    "best[height<=720][ext=mp4]/best"
)


def download(name: str, video_id: str) -> None:
    dest = OUT / f"{name}.mp4"
    url = f"https://www.youtube.com/watch?v={video_id}"
    print(f">>> {name} -> {dest.name}")
    cmd = [
        sys.executable,
        "-m",
        "yt_dlp",
        "--ffmpeg-location",
        FFMPEG,
        "-f",
        FMT,
        "--download-sections",
        "*0-30",
        "--force-keyframes-at-cuts",
        "--merge-output-format",
        "mp4",
        "-o",
        str(dest),
        "--no-playlist",
        url,
    ]
    subprocess.run(cmd, check=True)


def main() -> None:
    for name, vid in VIDEOS.items():
        download(name, vid)
    print("OK — fichiers dans public/videos/")


if __name__ == "__main__":
    main()

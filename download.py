import ssl
ssl._create_default_https_context = ssl._create_unverified_context
from pytube import Playlist
import os
import getpass as gt
import shutil
import glob

downloadDirectory = "/Users/stevehawkim/Desktop/HackGT"

username = gt.getuser()
dir = os.path.join("/Users", username, "Desktop", "HackGT", "song")
dir3 = os.path.join("/Users", username, "Desktop", "HackGT", "song", "mp3")
dir4 = os.path.join("/Users", username, "Desktop", "HackGT", "song", "mp4")

if not os.path.exists(dir):
    os.mkdir(dir)
    os.chdir(dir)
    downloadDirectory = dir
    os.mkdir(dir3)
    os.mkdir(dir4)

playlistLink = "http://www.youtube.com/playlist?list=PLNmwW5jY-ZuUSKtmo3D6Glv1LD_Y3G6Sm"
playlist = Playlist(playlistLink)

print("Total video to download: ", len(playlist.video_urls))    

print("\n\n Links of the youtube videos\n")

for url in playlist.video_urls:
    print(url)    

# For mp3
import ffmpy

for video in playlist.videos:

    audio = video.streams.get_audio_only()
    
    audio.download(downloadDirectory)

    videoTitle = video.title
    
    new_filename = videoTitle + '.mp3'
    default_filename = videoTitle + '.mp4'
    
    print(default_filename+'\n\n'+new_filename)

    ff = ffmpy.FFmpeg(
        inputs={default_filename : None},
        outputs={new_filename : None}
    )
    ff.run()

for file in glob.glob("*.mp3"):
    #print(file)
    shutil.move(file, dir3)

for file in glob.glob("*.mp4"):
    #print(file)
    shutil.move(file, dir4)
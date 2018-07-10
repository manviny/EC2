## OSX Crontab
´´´bash
env EDITOR=nano crontab -e  
43 16 * * 1-5  cd ~/my/backup/folder && ./backup.sh  
crontab -l
´´´

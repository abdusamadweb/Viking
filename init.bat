@echo off
set SERVER=164.92.247.46
set USERNAME=root
set PASSWORD=57246Abs
set LOCAL_DIR="C:\Users\user\Documents\Front-end\Viking\Viking"
set REMOTE_DIR=/var/www/viking-pay.com/html/
set ARCHIVE_PATH="C:\Users\user\Documents\Front-end\Viking\Viking\dist.tar.gz"


@REM vite build
REM node_modules papkasini chetlab o‘tib arxiv yaratish
tar --exclude=".idea" --exclude=".vscode"  --exclude=".git" --exclude="init.bat"  -czvf %ARCHIVE_PATH% -C "C:\Users\user\Documents\Front-end\Viking\Viking\dist" .


echo Starting SCP upload...

REM SCP orqali arxivni yuklash
scp %ARCHIVE_PATH% %USERNAME%@%SERVER%:%REMOTE_DIR%

echo Files uploaded. Extracting on server and starting project...

REM SSH orqali serverda arxivni ochish va `node index.js` buyrug'ini ishga tushirish
ssh %USERNAME%@%SERVER% "cd %REMOTE_DIR% && tar -xzvf dist.tar.gz && rm dist.tar.gz"
@REM
echo Project started on server.
pause

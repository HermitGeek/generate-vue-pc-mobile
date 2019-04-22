#!/bin
source ~/.bashrc
deployFolder=$(pwd | awk '{print $1}')/'to-deploy'


# 处理 jenkins 服务器上 to-deploy
if [ -d $deployFolder ]
then
     rm -rf $deployFolder/*
else
     mkdir $deployFolder
fi

# 安装依赖
npm install

# 打包
npm run build:$1

# 移动打包后的文件
mv dist/* $deployFolder/


# 压缩 deployFolder 
cd $deployFolder
tar -cvf ../to-deploy.tar *
rm -rf *


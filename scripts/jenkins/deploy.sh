#!/bin
source ~/.bashrc


# 删除所有文件（to-deploy、deploy.sh 除外）
rm -rf $(ls | grep -v to-deploy.tar |grep -v deploy.sh |grep -v h5 |grep -v admin)


# 将 to-deploy下所有文件移至当前目录
tar -xvf to-deploy.tar


# 删除 to-deploy、deploy.sh
rm to-deploy.tar deploy.sh

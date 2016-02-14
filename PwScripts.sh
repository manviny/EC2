#!/bin/bash

cd
sudo rm borraPW.sh creaPW.sh finalizaPW.sh
wget https://raw.githubusercontent.com/manviny/EC2/master/creaPW.sh  && sudo chmod +x creaPW.sh
wget https://raw.githubusercontent.com/manviny/EC2/master/finalizaPW.sh  && sudo chmod +x finalizaPW.sh
wget https://raw.githubusercontent.com/manviny/EC2/master/borraPW.sh  && sudo chmod +x borraPW.sh
sudo rm ./PwScripts.sh
echo "Se han instalado los scripts creaWeb.sh, borraPw.sh y finalizaPW.sh"

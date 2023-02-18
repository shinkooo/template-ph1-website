'use strict';

function process(){
  document.getElementById('target1').textContent = 'すっごく真面目です！';  
  document.getElementById('trigger1-1').classList.add('changed1');
}

document.getElementById('trigger1-1').addEventListener('click', process);
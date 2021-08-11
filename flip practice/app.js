const imgs = [
    'MnMulti_Mario.png',
    'MnMulti_splatoonGirl.png',
    'MnOpen_link.png',
    'MnOpen_Mario.png',
    'MnOpen_MarioKuppa.png',
    'MnOpen_Murabito.png',
    'MnOpen_Peach.png',
    'MnOpen_Sizue.png',
    'MnOpen_Yoshi.png',
    'MnSingle_Kuppa.png',
    'MnSingle_Mario.png',
    'MnSingle_Peach.png',
    'tc_MnOpen_BbLuigi.png',
    'tc_MnOpen_BbMario.png',
    'tc_MnOpen_BbRosetta.png',
    'tc_MnOpen_Iggy.png',
    'tc_MnOpen_Koopa.png',
    'tc_MnOpen_Larry.png',
    'tc_MnOpen_Lemmy.png',
    'tc_MnOpen_Luigi.png',
    'tc_MnOpen_RLMW.png',
    'tc_MnOpen_Rosetta.png'
  ]

  const img_location = '../pictures/';
  //first apply pictures to main page

  const maindiv = document.createElement('div');
  maindiv.setAttribute('class', 'maincontainer');
  document.querySelector('body').append(maindiv);
  for(let img of imgs){
 
        const carddiv = document.createElement('div');
        carddiv.setAttribute('class', 'card');
        const frontdiv = document.createElement('div');
        frontdiv.setAttribute('class', 'front');
        const backdiv = document.createElement('div');
        backdiv.setAttribute('class','back');
        const frontimg = document.createElement('img');
        const backimg = document.createElement('img');
        frontimg.setAttribute('src', img_location + 'question.png');
        backimg.setAttribute('src', img_location + img);
        frontdiv.append(frontimg);
        backdiv.append(backimg);
        carddiv.append(frontdiv);
        carddiv.append(backdiv);
        maindiv.append(carddiv);
        carddiv.addEventListener('click', function(){
            carddiv.classList.toggle('flipcard');
        })
        
        
  } 



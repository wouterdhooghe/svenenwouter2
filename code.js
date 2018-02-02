
//************************************* */
// CUSTOM FUNCTIES
//************************************* */

var customFunctions = {
    
    Plus: function () {
  //     arguments is een object met alle argumenten die zijn meegegeven met deze functie erin
  
  // de argumenten van de plus functie zijn een object, maar moeten eerst naar een array worden omgezet
  var argumentArray = Object.values(arguments);
  // Tel steeds de eerste op met de som van de rest van de array (reduce) en bekom zo de totale som
  sum = argumentArray.reduce(function (a,b) {return a + b;});
  return sum;
    },
    Times: function () {
  //     arguments is een object met alle argumenten die zijn meegegeven met deze functie erin
  
  // de argumenten van de Times functie zijn een object, maar moeten eerst naar een array worden omgezet
  var argumentArray = Object.values(arguments);
  // Tel steeds de eerste op met de som van de rest van de array (reduce) en bekom zo de totale som
  product = argumentArray.reduce(function (a,b) {return a * b;});
  return product;
    },
    minus: function (a, b) {
      return a - b;
    },
    binom: function (n, k) {
      return 1;
    },
    Select: function (a) {
      return a;
    }
  
  
  };
  
  customFunctions.Plus.toTex = function (node, options) {
      
      console.log('plusinputnode: ');
      console.log(node);
      totalargs = node.args.length;
      outputs = [];
  
      for (i=0; i<totalargs; i++) {
          outputs.push(node.args[i].toTex(options));
          console.log(outputs);
      };
      console.log('plusoutputs');
      console.log(outputs.join(' + '));
      return outputs.join(' + ');
  };
  
  customFunctions.Times.toTex = function (node, options) {
      
      console.log('timesinputnode: ');
      console.log(node);
  
      totalargs = node.args.length;
      outputs = [];
      for (i=0; i<totalargs; i++) {
          outputs.push(node.args[i].toTex(options));
      };
      console.log(outputs.join(' * '));
      return outputs.join(' * ');
  };
  customFunctions.binom.toTex = '\\mathrm{${name}}\\left(${args}\\right)'; //template string
  customFunctions.minus.toTex = function (node, options) { return node.args[0].toTex(options) 
    + node.name + node.args[1].toTex(options);
  };
  customFunctions.Select.toTex = function (node, options) {
      console.log('slct');
    return '\\textcolor{red}{' + node.args[0].toTex(options) + '}';
  };


//************************************* */
// UTILITY
//************************************* */

// invert functie van internet (support voor dubbele values). Accepteert alleen arrays als keys in het originele object

var invert = function(input) {
    var output = {}

    Object.keys(input).forEach(function(key) {
      var value = input[key]
      output[value] = output[value] || []
      output[value].push(key.split(','))
    })

    return output
}

var invertSimple = function(input) {
    var output = {}

    Object.keys(input).forEach(function(key) {
      var value = input[key]
      output[value] = key
    })

    return output
}

// niet destructief alternatief voor pop()
function returnWithoutLast(arr) {
newarr = [];
  for (i=0; i < arr.length - 1; i++) {
      newarr[i] = arr[i];
  };
return newarr;
};



//************************************* */
// SELECTIES
//************************************* */


// bouw een object met als keys de adressen in de uitdrukking bignode en als values het symbool op elk adres

function buildPath(bignode) {

    var adress = [];
    var lastChildAtLevel = [];
    var adressList = new Object;
  
      bignode.traverse(function (child,arg,parent) {
  
  switch (child.type) {
      case 'OperatorNode': name = child.op;    break;
      case 'ConstantNode': name = child.value; break;
      case 'FunctionNode': name = child.fn;    break;
      case 'SymbolNode':   name = child.name;  break;
      default:             name = child.type;
    }
  
   if (arg==null) {arg='root?'}
  
   switch (arg.slice(0,4)) {
       case 'args':    argnum = /\d+/.exec(arg); break ;
       case 'cont':   argnum = 0; break; 
       default:       argnum = 8;
   }
  
   if (parent == null) {
       totalargs = 0
   } else {
      parent.args == undefined ? totalargs = 0 : totalargs = parent.args.length - 1
   }
  
   var leaf = child.args == undefined & child.content == undefined;
   var lastChild = argnum == totalargs;
  
   adress.push(arg);
  
  // console.log(name + ':' + adress);
  
   adressList[adress] = name;
  
  // console.log('arg:'+ arg + 'argnum: '+argnum + 'totalargs:' + totalargs);
  
  if (lastChild) {
          lastChildAtLevel[adress.length]=1;
      };
   //   console.log(lastChildAtLevel);
   //   console.log('lastChild=' + lastChild);
  
   if (leaf == 1) {
       
      adress.pop()
  
   //   console.log('leafpop');
  
      if (lastChild == true) {
  
   //       console.log('leaf+lastChild');
  
          while (lastChildAtLevel[lastChildAtLevel.length -1 ] == 1) {
              adress.pop();
              lastChildAtLevel.pop();
   //           console.log('poptit: '+ lastChildAtLevel.length);
          };
       //   adress.pop();
      };
      
  
  };
  
      }
      );
  
   return adressList;
  };
  
  // geeft een array terug met alle adressen van de gevraagde string in de uitdrukking bignode
  function adresses(string, bignode) {
      return invert(buildPath(bignode))[string];
  }
  
  // geeft de uitdrukking die op het gegeven adres staat in de uitdrukking bignode
  function readAtAdress(adress,bignode) {
  
      var node = math.parse('');
  
      for (i = 0; i < adress.length; i++) {
          arg = adress[i];
          switch (arg.slice(0,4)) {
              case 'root':   node = bignode; console.log('readroot'); break;
              case 'args':    node = node.args[/\d+/.exec(arg)]; console.log('readargs['+/\d+/.exec(arg)+']'); break;
              case 'cont':   node = node.content; console.log('readcontent'); break; 
              default:        alert('error: non-valid adress: ' + arg);
          };
          
      };
  
      return node;
  ;}
  
  function injectAtAdress(subst,adress,bignode) {
      if (typeof subst === 'string') { subst = math.parse(subst)};
  
      var eq = bignode;
      var adressText = '';
  
      for (i = 0; i < adress.length; i++) {
          arg = adress[i];
          switch (arg.slice(0,4)) {
              case 'root':    adressText = ''; /* console.log(arg, adressText) */; break;
              case 'args':    adressText = adressText + '.args[' + /\d+/.exec(arg) + ']'; /* console.log(arg, adressText) */; break;
              case 'cont':   adressText = adressText + '.content'; /* console.log(arg, adressText) */; break; 
              default:        alert('error: non-valid adress' + arg);
          };
          
      };
  
   //   console.log('adrestext:' + adressText + ' subst: ' + subst);
  // PAS OP WANT DIT IS DESTRUCTIEF en vERANDERT DE OORSPRONKELIJKE VARIABELE !!!
  // IS DAT ECHT ZO? CHECK DIT!
      eval('eq'+adressText+ '= subst');
      return eq;
  };
  
  // zet een Select() rond de gegeven uitdrukking (mag in stringvorm of in objectvorm zijn)
  function selectIt(node) {
      if (typeof node === 'string') { node = math.parse(node)};
      return new math.expression.node.FunctionNode('Select', [node]);
  }
  
  // vervangt wat nu geselecteerd is in bignode door de opgegeven substitutie (mag in stringvorm of in objectvorm zijn)
  // de substitutie moet zelf al een Select bevatten want deze functie voegt die niet toe
  function substituteSelected(subst, bignode) {
      if (typeof subst === 'string') { subst = math.parse(subst)};
  
      // replace in all select adresses
      adresses('Select', bignode).forEach(function (adress) {
          injectAtAdress(subst,adress,bignode);
  }
      );
      return bignode;
  };
  
  /* OUDE VERSIE MET TRANSFORM FUNCTIE
  function substituteSelected(subst, bignode) {
      
   subst = subst.replace('Select', 'Salect');
   subst = math.parse(subst);
  
      eq = bignode.transform(function (node, path, parent) {
    if (node.name === 'Select') {
        console.log('subbed')
      return subst;
    }
  
  //  }
    else {
        console.log('nosub')
        return node;
    }
  });
  
  eq = eq.transform(function (node, path, parent) {
    if (node.name === 'Salect') {
        console.log('subbed')
      return math.parse('Select(' + node.args[0] + ')');
    }
  
    else {
        console.log('nosub')
        return node;
    }
  });
  
  return eq
  
  };
   */



selected = function (node) {
      
var filtered = node.filter(function (node) {
  return node.isFunctionNode && node.name === 'Select';
});

return filtered;

}


//************************************* */
// UPDATES
//************************************* */

updateEval = function (node) {
    
    antwoord = equation.compile().eval();
    antwoord ? result.innerHTML = antwoord.toString() : result.value = '' ;
    
};

updateLatex = function (node) {
    try {
        // update expression

        expr.value = equation;

      // export the expression to LaTeX
        var latex = node ? node.toTex({parenthesis: parenthesis, implicit: implicit}) : '';
//      console.log('LaTeX expression:', latex);
        var largeLatex = '\\large ' + latex;
        var hugeLatex = '\\Huge ' + latex;

      // display and re-render the expression
      katex.render(largeLatex, pretty);
    }
    catch (err) {pretty.innerHTML = "error!!!"}
    updateEval(node);
}

updateLatex(equation);

// verplaatst de selectie naar het gevraagde adress
// past global variabele equation aan!
function MoveSelectToAdress(selectAdress,newAdress,eq) {
    // select eruit halen (dit werkt is getest)
    var cleanedEquation = eq.transform(function (child, path, parent) {
        if (child.fn == 'Select') {return child.args[0] } else { return child};
    });
console.log('cleaned');

 eq = injectAtAdress(selectIt(readAtAdress(newAdress, cleanedEquation)),newAdress,cleanedEquation);
 console.log('injected');
 equation = eq;

};


//************************************* */
// ACTIES
//************************************* */

function replaceWithPlus() {
//    expr.value = 'Plus(3, Times(3, Select(4), 5), 7)';

substitution = 'Select(x) + y';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}

function replaceWithTimes() {

substitution = 'Select(a) * b';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithPower() {

substitution = 'Select(a) ^ b';
equation = substituteSelected( substitution, equation);
updateLatex(equation);

}
function replaceWithMinus() {

substitution = '(Select(a)-b)';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithDivide() {

substitution = 'Select(a) / b';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithNthroot() {

substitution = 'nthRoot(Select(a),b)';
equation = substituteSelected( substitution, equation);
updateLatex(equation);
}
function replaceWithEquality() {
    equation = math.parse('Select(a)==b');
    updateLatex(equation);
}

function leftSelect(eq) {

// bereken het nieuwe adres voor select
// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties 
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

// als Select al de root is: doe niks
if (eq.fn == 'Select') {return}; 

// vind het nummer van dit argument
if (selectAdress[selectAdress.length - 1] == 'content') {
    huidigNummer = 0;
} 
else {
    huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length -1])[0]);
};

upAdress = returnWithoutLast(selectAdress);
console.log('upAdress: ');
console.log(upAdress);

nieuwNummer = Math.max(0,huidigNummer - 1);

if (selectAdress[selectAdress.length - 1] == 'content') {
    leftAdress = upAdress.concat(['content']);
} 
else {
    leftAdress = upAdress.concat(['args[' + nieuwNummer +']']);
};

console.log('leftAdress: ');
console.log(leftAdress);

MoveSelectToAdress(selectAdress,leftAdress,eq);

updateLatex(equation);

}

function rightSelect(eq) {
    // bereken het nieuwe adres voor select
// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties 
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

// als Select al de root is: doe niks
if (eq.fn == 'Select') {return}; 

// vind het nummer van dit argument, en het aantal argumenten
if (selectAdress[selectAdress.length - 1] == 'content') {
    huidigNummer = 0;
} 
else {
    huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length -1])[0]);
};
console.log('huidigNummer: ');
console.log(huidigNummer);

upAdress = returnWithoutLast(selectAdress);
console.log('upAdress: ');
console.log(upAdress);

upNode = readAtAdress(upAdress, eq);
upNode.args == undefined ? laatsteNummer = 0 : laatsteNummer = upNode.args.length - 1;
console.log('laatsteNummer: ' + laatsteNummer);

nieuwNummer = Math.min(huidigNummer + 1,laatsteNummer);
console.log('nieuwNummer: ' + nieuwNummer);

if (selectAdress[selectAdress.length - 1] == 'content') {
    rightAdress = upAdress.concat(['content']);
} 
else {
    rightAdress = upAdress.concat(['args[' + nieuwNummer +']']);
};
console.log('rightAdress: ');
console.log(rightAdress);

MoveSelectToAdress(selectAdress,rightAdress,eq);

updateLatex(equation);
}

function upSelect(eq) {
    // als Select al de root is: doe niks
if (eq.fn == 'Select') {return}; 
    // bereken het nieuwe adres voor select

// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties    
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

upAdress = returnWithoutLast(selectAdress);
console.log(' upAdress: ');
console.log(upAdress);

//     // select eruit halen (dit werkt is getest)
//     var cleanedEquation = eq.transform(function (child, path, parent) {
//         if (child.fn == 'Select') {return child.args[0] } else { return child};
//     });
// console.log('cleaned');

//  eq = injectAtAdress(selectIt(readAtAdress(upAdress, cleanedEquation)),upAdress,cleanedEquation);
//  console.log('injected');
//  equation = eq;

MoveSelectToAdress(selectAdress,upAdress,eq);

updateLatex(equation);
}

function downSelect(eq,actionName) {

// dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties    
selectAdress = adresses('Select',eq)[0];
console.log('selectAdress: ');
console.log(selectAdress);

selectNode = readAtAdress(selectAdress,eq);

// als Select een leaf is: doe niks
    if (selectNode.args[0].args == undefined & selectNode.args[0].content == undefined) {return};
// ALLEEN ALS GEEN CONTENT ALS CONTENT DAN select.adress.content
if (selectNode.args[0].content == undefined) {downAdress = selectAdress.concat(['args[0]']);} 
else if (selectNode.args[0].args == undefined) {downAdress = selectAdress.concat(['content']);}
else {return};

console.log(' downAdress: ');
console.log(downAdress);

//     // select eruit halen (dit werkt is getest)
//     var cleanedEquation = eq.transform(function (child, path, parent) {
//         if (child.fn == 'Select') {return child.args[0] } else { return child};
//     });
// console.log('cleaned');

//  eq = injectAtAdress(selectIt(readAtAdress(downAdress, cleanedEquation)),downAdress,cleanedEquation);
//  console.log('injected');
//  equation = eq;

MoveSelectToAdress(selectAdress,downAdress,eq);

// noteer dat er een succesvolle downselect is gebeurd
keysList.push(actionName);
// update de latexweergave
updateLatex(equation);

}
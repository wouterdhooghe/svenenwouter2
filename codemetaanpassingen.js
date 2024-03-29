
//************************************* */
// CUSTOM FUNCTIES
//************************************* */

var customFunctions = {
  Plus: function() {
    //     arguments is een object met alle argumenten die zijn meegegeven met deze functie erin
    // de argumenten van de plus functie zijn een object, maar moeten eerst naar een array worden omgezet
    var argumentArray = Object.values(arguments);
    // Tel steeds de eerste op met de som van de rest van de array (reduce) en bekom zo de totale som
    sum = argumentArray.reduce(function(a, b) {
      return a + b;
    });
    return sum;
  },
  Times: function() {
    //     arguments is een object met alle argumenten die zijn meegegeven met deze functie erin

    // de argumenten van de Times functie zijn een object, maar moeten eerst naar een array worden omgezet
    var argumentArray = Object.values(arguments);
    // Tel steeds de eerste op met de som van de rest van de array (reduce) en bekom zo de totale som
    product = argumentArray.reduce(function(a, b) {
      return a * b;
    });
    return product;
  },
  // minus: function(a, b) {
  //   return a - b;
  // },
  binom: function(n, k) {
    return 1;
  },
  Select: function(a) {
    return a;
  },

  And: function() {
    var argumentArray = Object.values(arguments);
    allTrue = argumentArray.reduce(function(a, b) {
      return a && b;
    });
    return allTrue;
  },

  Or: function() {
    var argumentArray = Object.values(arguments);
    atLeastOneTrue = argumentArray.reduce(function(a, b) {
      return a || b;
    });
    return atLeastOneTrue;
  }
};

customFunctions.Plus.toTex = function(node, options) {
  output = "";
  plusTeken = "";
  node.args.forEach(function(value, index, parent) {
    // geen + schrijven als er toch al een unary minus staat (tenzij er een select rond de unary minus staat)
    // geen plus schrijven voor de eerste term
    value.name == "unaryMinus" ? (plusTeken = "") : (plusTeken = "+");
    index == 0 ? (output = output) : (output += plusTeken);
    output += value.toTex(options);
    // console.log("plustex:" + output);
  });
  // return '(' + output + ')';
  return output;
};

/*
        Plus(Select(3),Times(4,Times(5,6),7),8,9,10)
 */

customFunctions.Times.toTex = function(node, options) {
  output = "";
  options.implicit == "hide" ? (maalTeken = "~") : (maalTeken = "\\cdot");
  // console.log('teken: ' + maalTeken);
  node.args.forEach(function(value, index, parent) {
    // console.log('maalteken: ' + maalTeken);

    value.isConstantNode ||
    (value.name == "Select" && value.args[0].isConstantNode)
      ? (ditTeken = "\\cdot")
      : (ditTeken = maalTeken);
    if (index == 0) {
      ditTeken = "";
    } else if (
      value.isConstantNode ||
      (value.name == "Select" && value.args[0].isConstantNode)
    ) {
      ditTeken = "\\cdot";
    } else {
      ditTeken = maalTeken;
    }

    output += ditTeken;

    // console.log('ditTeken: ' + ditTeken);

    selectedPlus = value.name == "Select" && value.args[0].name == "Plus";
    plus = value.name == "Plus";

    plusOrSelectedPlus = selectedPlus || plus;

    // console.log('plusOrSelectedPlus' + plusOrSelectedPlus);

    plusOrSelectedPlus
      ? (output += "(" + value.toTex(options) + ")")
      : (output += value.toTex(options));

    //     console.log('timestex: '+ output);
    //     console.log(value);
    //    // console.log(value.toTex(options));
  });
  options.parenthesis == "all"
    ? (output = "(" + output + ")")
    : (output = output);
  //return output;
  // console.log(output);
  return output;
};

// katex.render("\\begin{cases} a b + c &=a \\\\ a b + c &=d \\\\ a b + c + d &=b \\\\ a b + c &=b \\\\ e&=b+c \\end{cases}", pretty)
// Stelsels

customFunctions.And.toTex = function(node, options) {
  var output = "";
  node.args.forEach(function(value, index, parent) {
    output += value.toTex(options);
    index == parent.length - 1 ? (output = output) : (output += "\\\\");
  });

  output = "\\begin{cases}" + output + "\\end{cases}";
  return output;
};

// katex.render("\\begin{array}{c|c} a & b \\\\ c & d \\end{array}", pretty)
// Disjuncties

customFunctions.Or.toTex = function(node, options) {
  var output = "";
  var c = "";
  node.args.forEach(function(value, index, parent) {
    output += value.toTex(options);
    c += "c";
    index == parent.length - 1 ? (output = output) : (output += "&");
    index == parent.length - 1 ? (c = c) : (c += "|");
  });

  output = "\\begin{array}{" + c + "}" + output + "\\end{array}";
  return output;
};

customFunctions.binom.toTex = "\\mathrm{${name}}\\left(${args}\\right)"; //template string
// customFunctions.minus.toTex = function(node, options) {
//   return node.args[0].toTex(options) + node.name + node.args[1].toTex(options);
// };
customFunctions.Select.toTex = function(node, options) {
  // console.log("slct");
  return "\\textcolor{red}{" + node.args[0].toTex(options) + "}";
};

//************************************* */
// f knoppen
//************************************* */

function f1_hold(eq) {};
function f2_hold(eq) {};
function f3_hold(eq) {};
function f4_hold(eq) {};
function f5_hold(eq) {};
function f6_hold(eq) {};
function f7_hold(eq) {};
function f8_hold(eq) {};
function f9_hold(eq) {};
function f10_hold(eq) {};
function f11_hold(eq) {};
function f12_hold(eq) {};

function f1_release(eq) { f1(eq)};
function f2_release(eq) { f2(eq)};
function f3_release(eq) { f3(eq)};
function f4_release(eq) { f4(eq)};
function f5_release(eq) { f5(eq)};
function f6_release(eq) { f6(eq)};
function f7_release(eq) { f7(eq)};
function f8_release(eq) { f8(eq)};
function f9_release(eq) { f9(eq)};
function f10_release(eq) {f10(eq)};
function f11_release(eq) {f11(eq)};
function f12_release(eq) {f12(eq)};


function f1(eq) {
  // updateLatex(toegekendeFunctie["f1"](eq)[0]);
  // updateF(naar(eq,"getal")[1],"f1_button");

  // updateLatexAndFs(toegekendeFunctie["f1"](eq)[0]);

  var regels = toegekendeRegels["f1"];

  updateLatexAndFs(naar(eq,regels)[0]);
  
  
}

function f2(eq) {

  var regels = toegekendeRegels["f2"];
  
  // updateLatex(naar(eq,regels)[0]);
  // updateF(naar(eq,regels)[1],"f2_button");

  updateLatexAndFs(naar(eq,regels)[0]);

// naarplus(eq);

}

function f3(eq) {

  var regels = toegekendeRegels["f3"];

  updateLatexAndFs(naar(eq,regels)[0]);

// naartimes(eq);  
  
}

function f4(eq) {

  var regels = toegekendeRegels["f4"];

  updateLatexAndFs(naar(eq,regels)[0]);

  // naarmin(eq);
}

function f5(eq) {
  
  var regels = toegekendeRegels["f5"];

  updateLatexAndFs(naar(eq,regels)[0]);
  
  // naarbreuk(eq);
}

function f6(eq) {
// naarmacht(eq);

var regels = toegekendeRegels["f6"];

updateLatexAndFs(naar(eq,regels)[0]);
}

function f7(eq) {
  var regels = toegekendeRegels["f7"];

  updateLatexAndFs(naar(eq,regels)[0]);
// naarexp(eq);  
}

function f8(eq) {
// naarwortel(eq);  
var regels = toegekendeRegels["f8"];

updateLatexAndFs(naar(eq,regels)[0]);
}

function f9(eq) {

  var regels = toegekendeRegels["f9"];

  updateLatexAndFs(naar(eq,regels)[0]);

}

function f10(eq) {

var regels = toegekendeRegels["f10"];
updateLatexAndFs(naar(eq,regels)[0]);
  
}

function f11(eq) {
  var regels = toegekendeRegels["f11"];
updateLatexAndFs(naar(eq,regels)[0]);
}

function f12(eq) {
  var regels = toegekendeRegels["f12"];
updateLatexAndFs(naar(eq,regels)[0]);
}

function f13(eq) {
  var regels = toegekendeRegels["f13"];
updateLatexAndFs(naar(eq,regels)[0]);
}

function f14(eq) {
  var regels = toegekendeRegels["f14"];
updateLatexAndFs(naar(eq,regels)[0]);
}

function naar(eq, regelset) {
  console.log(regelset + " gestart");

  regelArray = eval(regelset);

  for (i in regelArray) {
    testregel = regelArray[i];
    uitkomst = regelTransformSelected(eq, regels[testregel]);
        neweq = uitkomst[0];
        newnode = uitkomst[1];

        if (neweq) {
          console.log("nieuwe eq:  " + neweq.toString());

            return [neweq, newnode];
            console.log('als je dit kan lezen is er iets mislukt')

        }
  };

}

function naargetal(eq) {

  console.log('naargetal gestart');

  for (i in naargetalregels) {
    testregel = naargetalregels[i];
    uitkomst = regelTransformSelected(eq, regels[testregel]);
        neweq = uitkomst[0];
        newnode = uitkomst[1];

        if (neweq) {
          console.log("nieuwe eq:  " + neweq.toString());

            return [neweq, newnode];
            console.log('als je dit kan lezen is er iets mislukt')

        }
  };

}

// naarplus, naartimes etc gebruiken nog niet het idee dat regeltransformselected een array output heeft. Maar ze worden ook niet meer gebruikt nu dus weg.

// function naarplus(eq) {
//     // regels die naar Plus omzetten: binomium2Expand, binomium3Expand, verschilVanKwadratenExpand1, factorBuitenhalen
//     // momenteel wordt de eerste van alle mogelijke regels uitgevoerd, en dan stopt het.

//  /// idee: voor alle regels in naarPlus, bereken de uitkomst. Alle uitkomsten presenteren aan de gebruiker.
//  // gebruiker kiest en de keuze wordt geimplementeerd.

//  console.log('naarplus gestart');

//     try {
//       naarplusregels.forEach(function (testregel) {
//           uitkomst = regelTransformSelected(eq, regels[testregel]);
//           console.log('uitkomst = ' + uitkomst);
//           if (uitkomst) {
//             console.log("nieuwe eq:  " + uitkomst.toString());
              
//               updateLatex(flatten(uitkomst));
//               throw breakException;
//           }
//       })

//     } catch(e) {}

// }

// function naartimes(eq) {

//   console.log('naartimes gestart');

//   try {
//     naartimesregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }

// function naarmin(eq) {

//   console.log('naarmin gestart');

//   try {
//     naarminregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }

// function naarbreuk(eq) {

//   console.log('naarbreuk gestart');

//   try {
//     naarbreukregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }

// function naarmacht(eq) {

//   console.log('naarmacht gestart');

//   try {
//     naarmachtregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }

// function naarexp(eq) {

//   console.log('naarexp gestart');

//   try {
//     naarexpregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }

// function naarwortel(eq) {

//   console.log('naarwortel gestart');

//   eqvoorvoorvoor = equation.cloneDeep();

//   try {
//     naarwortelregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }

// function naarlog(eq) {

//   console.log('naarlog gestart');

//   try {
//     naarlogregels.forEach(function (testregel) {
//         uitkomst = regelTransformSelected(eq, regels[testregel]);
//         console.log('uitkomst = ' + uitkomst);
//         if (uitkomst) {
//           console.log("nieuwe eq:  " + uitkomst.toString());
            
//             updateLatex(flatten(uitkomst));
//             throw breakException;
//         }
//     })

//   } catch(e) {}

// }


//************************************* */
// UTILITY
//************************************* */

// invert functie van internet (support voor dubbele values). Accepteert alleen arrays als keys in het originele object

var invert = function(input) {
  var output = {};

  Object.keys(input).forEach(function(key) {
    var value = input[key];
    output[value] = output[value] || [];
    output[value].push(key.split(","));
  });

  return output;
};

var invertSimple = function(input) {
  var output = {};

  Object.keys(input).forEach(function(key) {
    var value = input[key];
    output[value] = key;
  });

  return output;
};

// niet destructief alternatief voor pop()
function returnWithoutLast(arr) {
  newarr = [];
  for (i = 0; i < arr.length - 1; i++) {
    newarr[i] = arr[i];
  }
  return newarr;
}

function verwijderEnkeleMultifunctionsCallBack(node, index, parent) {
                      // // als er maar een argument is vervalt de functie
                      if (multiFunction[node.name] == 1) {
                        if (node.args.length == 1) {
                        console.log('multifunction node heeft maar 1 arg');
                        console.log('node = ' + node.toString());
                        console.log('child = ' + node.args[0].toString());
                        return node.args[0];
                      } else {
                        return node;
                      }
                      } else {
                        return node;
                      }
};

// deze is in principel desctuructief denk ik want gebruikt geen DeepClone
function verwijderEnkeleMultifunctions(eq) {
 // neweq = verwijderEnkeleMultifunctionsCallBack(eq);
  neweq = eq.transform(verwijderEnkeleMultifunctionsCallBack);
  return neweq;
}

// brengt geneste multifunctions Plus en Times samen in 1 niveau.
// Niet destructief!
function flatten(eq) {
  neweq = eq.cloneDeep();
  neweq = verwijderEnkeleMultifunctions(neweq);
  neweq.traverse(function(node, index, parent) {

    if (parent != null) {
      //           console.log(node);



     if (node.type == "FunctionNode") {
        if ((multiFunction[parent.name] == 1) & (node.name == parent.name)) {
          indexnum = Number(/\d+/.exec(index));

          // args van de parent vervangen door eerste deel parent.args, dan child.args, dan tweede deel parents.args
                            //  console.log('indexnum:' + indexnum);
                            //  console.log('eerste deel:');
                            //  console.log(parent.args.slice(0, indexnum));
                            //  console.log('tweede deel:');
                            //  console.log(node.args);
                            //  console.log('derde deel:');
                            //  console.log(parent.args.slice(indexnum + 1, parent.args.length));

          parent.args = parent.args
            .slice(0, indexnum)
            .concat(
              node.args,
              parent.args.slice(indexnum + 1, parent.args.length)
            );
          console.log("flattened");
          console.log(parent.args.length);
        }


      }
    }
  });

  return neweq;
}

// brengt geneste multifunctions add en times samen in 1 niveau.
// Niet destructief!
function flattenOp(eq) {
  neweq = eq.cloneDeep();
  neweq.traverse(function(node, index, parent) {
    if (parent != null) {
      //           console.log(node);
      if (node.type == "OperatorNode") {
        if ((multiFunction[parent.fn] == 1) & (node.fn == parent.fn)) {
          indexnum = Number(/\d+/.exec(index));

          // args van de parent vervangen door eerste deel parent.args, dan child.args, dan tweede deel parents.args
          //                    console.log('indexnum:' + indexnum);
          //                    console.log('eerste deel:');
          //                    console.log(parent.args.slice(0, indexnum));
          //                    console.log('tweede deel:');
          //                    console.log(node.args);
          //                    console.log('derde deel:');
          //                    console.log(parent.args.slice(indexnum + 1, parent.args.length));

          parent.args = parent.args
            .slice(0, indexnum)
            .concat(
              node.args,
              parent.args.slice(indexnum + 1, parent.args.length)
            );
          console.log("flattenedOp");
          console.log(parent.args.length);
        }
      }
    }
  });

  return neweq;
}

// least factor functie van internet. Werkt voor integers tot 2^53
// find the least factor in n by trial division
function leastFactor(n) {
  if (isNaN(n) || !isFinite(n)) return NaN;
  if (n == 0) return 0;
  if (n % 1 || n * n < 2) return 1;
  if (n % 2 == 0) return 2;
  if (n % 3 == 0) return 3;
  if (n % 5 == 0) return 5;
  var m = Math.sqrt(n);
  for (var i = 7; i <= m; i += 30) {
    if (n % i == 0) return i;
    if (n % (i + 4) == 0) return i + 4;
    if (n % (i + 6) == 0) return i + 6;
    if (n % (i + 10) == 0) return i + 10;
    if (n % (i + 12) == 0) return i + 12;
    if (n % (i + 16) == 0) return i + 16;
    if (n % (i + 22) == 0) return i + 22;
    if (n % (i + 24) == 0) return i + 24;
  }
  return n;
}

// gebruikt leastFactor om een string terug te geven met alle priemfactoren
function factor(n) {
  if (isNaN(n) || !isFinite(n) || n % 1 != 0 || n == 0) return "" + n;
  if (n < 0) return "-" + factor(-n);
  var minFactor = leastFactor(n);
  if (n == minFactor) return "" + n;
  return minFactor + "*" + factor(n / minFactor);
}

function vergelijkingIsGeselecteerd(selectAdres) {
  return readAtAdress(selectAdres, equation).args[0].op == "==";
}

function cleanEquation(eq) {
  // select eruit halen (dit werkt is getest)
  var cleanedEquation = eq.transform(function(child, path, parent) {
    if (child.fn == "Select") {
      return child.args[0];
    } else {
      return child;
    }
  });
  return cleanedEquation;
}

//  TODO wat doet deze functie eigenlijk, en is ze compatibel met het idee van de previews?
function SelectAllLettersInSelection(letter, eq) {
  cleanedEquation = cleanEquation(eq);

  build = invert(buildPath(cleanedEquation));

  eq = cleanedEquation;
  build[letter].forEach(function(adres) {
    eq = injectAtAdress(selectIt(letter), adres, eq);
  });
 

  // selectAdresses = adresses('Select', eq);
  // selectAdresses.forEach(function setnodes(selectAdres, index) {
  //    selectNode = readAtAdress(selectAdres, equation);

  // });

  updateLatex(eq);
}

// werkt voor geen meter
function placeholders(node) {
  return node.filter(function(item) {
    item.isSymbolNode;
  });
}

function patternContents(cleanedNode, patternNode, unknownArr) {
  output = {};
  unknownArr.forEach(function(letter) {
    adresses(letter, patternNode).forEach(function(adres) {
      output[letter] = readAtAdress(adres, cleanedNode);
      console.log("unkownletter: " + letter);
      console.log("expr voor letter: " + output[letter]);
    });
  });
  return output;
}

//  TODO: matchesPattern aanpassen zodat het niet meer matchet als er nog een stuk achteraan komt
function matchesPattern(cleanedNode, patternNode, unknownArr) {
  patpad = buildPath(patternNode);
  bigpad = buildPath(cleanedNode);

  // console.log("patpad ");
  // console.log(patpad);
  // console.log("bigpad ");
  // console.log(bigpad);

  // placeholders = ['a','b','c','d','x','y','z'];
  checker = {};
  var match = true;
  for (var place in patpad) {
    currentplaceholder = patpad[place];
    match =
      match &&
      (patpad[place] == bigpad[place] ||
        unknownArr.includes(currentplaceholder));
    if (unknownArr.includes(currentplaceholder)) {
      if (bigpad[place] == undefined) {
        // console.log("adres bestaat niet in cleanednode ");
        return false;
      } else {
        // console.log("place " + place);
        adres = place.split(",");
        subexp = readAtAdress(adres, cleanedNode);
        // console.log("subexp = " + subexp.toString());
        checker[currentplaceholder]
          ? (match = match && checker[currentplaceholder].equals(subexp))
          : (checker[currentplaceholder] = subexp);

          // weggecommente poging om overmatching te vermijden werkt niet... geen idee waarom
          // keys(bigpad).forEach( key => {if (key.includes(place)) {  bigpad[key]}});

      }
    }

    console.log("place match =" + match);
    
    
  }
  // rest = Object.keys(bigpad).length
  // console.log('rest = ' + rest );
  console.log("pattern match =" + match);
  // return match && rest==0;
  return match;
}

// als eq het juiste patroon heeft, return dan de getransformeerde versie
//
function transformNode(
  cleanedEq,
  inputPatternNode,
  outputPatternNode,
  unknownInArr,
  unknownOutArr
) {
  // cleanedEq = cleanEquation(eq);

  if (matchesPattern(cleanedEq, inputPatternNode, unknownInArr)) {
    output = patternContents(cleanedEq, inputPatternNode, unknownInArr);
    adressen = invert(buildPath(outputPatternNode));

console.log('unknownoutARR= ');
console.log(unknownOutArr);

    unknownOutArr.forEach(function(placeholder) {
        console.log('crrent placeholder = ' + placeholder);
      adressen[placeholder].forEach(function(adres) {
        outputPatternNode = injectAtAdress(
          output[placeholder],
          adres,
          outputPatternNode
        );
      });
    });

    return outputPatternNode;
  } else {
    return false;
  }
}

// heeft volledige equation als 1e output, en transformed als 2e output
function transformSelected(
  eq,
  inputPatternNode,
  outputPatternNode,
  unknownInArr,
  unknownOutArr,
  functie,
  extraEquation
) {
  
  selectAdresses = adresses("Select", eq);
  selectAdresses.forEach(function setnodes(selectAdres, index) {
    selectNode = readAtAdress(selectAdres, eq);

    if (functie) {
      console.log(
        "doe transformSelected met functie: "
      );
      transformed = functie(selectNode.args[0]);
    } else {
      console.log(
        "doe transformSelected met inputPattern: " + inputPatternNode.toString()
      );

      //  SKIP VOOR TEST DE HELE MATCH CRAP VAN VROEGER

      transformed = transformNode(
        selectNode.args[0],
        inputPatternNode,
        outputPatternNode,
        unknownInArr,
        unknownOutArr
      );

      //  EN DOE GEWOON ALTIJD DEZE F|UNCTIE
      // TODO DIT TERUG VERWIJDEREN EN MSS optermijn de oude crap echt vervangen door functies

      // transformed = regels.eenNeutraalVoorMaal.functie(selectNode.args[0]);
    }

    
    if (transformed) { 

      eq = injectAtAdress(selectIt(transformed), selectAdres, eq);
      eq = flatten(eq);

      if (extraEquation) {
        console.log('extra equation toevoegen');
        eq = applyEquality(eq,extraEquation);

      }

      
      console.log('uitdrukking vervangen via regel: ' + transformed.toString() );
      
    } else {
      console.log('uitdrukking niet vervangen via regel');
      eq = false;
     };
     
  });
  console.log('eq op einde = ' + eq.toString());
  return [eq,transformed];
}

function regelTransformSelected(eq, regel) {
  console.log("doe regeltransformSelected op: ");
  console.log(regel.naam);

  // console.log(multiFunction);
  return transformSelected(
    eq,
    regel.input.expr,
    regel.output.expr,
    regel.input.unknowns,
    regel.output.unknowns,
    regel.functie,
    regel.extraEquation
  );
  // updateLatex(eq);
}

function oneCombinations([node,arr]) {oneComb = []; arr.forEach(s => oneComb.push([node,s])); return oneComb};
function twoCombinations(genArray) { twoComb = []; genArray[0].forEach( s => twoComb.push(oneCombinations(s,genArray[1])));return twoComb }

function makeMulti(multiName, multiArgs) { return new math.expression.node.FunctionNode(multiName, multiArgs); }

//************************************* */
// SELECTIES
//************************************* */

// bouw een object met als keys de adressen in de uitdrukking bignode en als values het symbool op elk adres

function buildPath(bignode) {
  var adress = [];
  var lastChildAtLevel = [];
  var adressList = new Object();

  bignode.traverse(function(child, arg, parent) {
    switch (child.type) {
      case "OperatorNode":
        name = child.op;
        break;
      case "ConstantNode":
        name = child.value;
        break;
      case "FunctionNode":
        name = child.fn;
        break;
      case "SymbolNode":
        name = child.name;
        break;
      default:
        name = child.type;
    }

    if (arg == null) {
      arg = "root?";
    }

    switch (arg.slice(0, 4)) {
      case "args":
        argnum = /\d+/.exec(arg);
        break;
      case "cont":
        argnum = 0;
        break;
      default:
        argnum = 8;
    }

    if (parent == null) {
      totalargs = 0;
    } else {
      parent.args == undefined
        ? (totalargs = 0)
        : (totalargs = parent.args.length - 1);
    }

    var leaf = (child.args == undefined) & (child.content == undefined);
    var lastChild = argnum == totalargs;

    adress.push(arg);

    // console.log(name + ':' + adress);

    adressList[adress] = name;

    // console.log('arg:'+ arg + 'argnum: '+argnum + 'totalargs:' + totalargs);

    if (lastChild) {
      lastChildAtLevel[adress.length] = 1;
    }
    //   console.log(lastChildAtLevel);
    //   console.log('lastChild=' + lastChild);

    if (leaf == 1) {
      adress.pop();

      //   console.log('leafpop');

      if (lastChild == true) {
        //       console.log('leaf+lastChild');

        while (lastChildAtLevel[lastChildAtLevel.length - 1] == 1) {
          adress.pop();
          lastChildAtLevel.pop();
          //           console.log('poptit: '+ lastChildAtLevel.length);
        }
        //   adress.pop();
      }
    }
  });

  return adressList;
}

// geeft een array terug met alle adressen van de gevraagde string in de uitdrukking bignode
function adresses(string, bignode) {
  return invert(buildPath(bignode))[string];
}

// geeft de uitdrukking die op het gegeven adres staat in de uitdrukking bignode
function readAtAdress(adress, bignode) {
  var node = math.parse("");

  for (i = 0; i < adress.length; i++) {
    arg = adress[i];
    switch (arg.slice(0, 4)) {
      case "root":
        node = bignode;
     // console.log("readroot");
        break;
      case "args":
        node = node.args[/\d+/.exec(arg)];
     // console.log("readargs[" + /\d+/.exec(arg) + "]");
        break;
      case "cont":
        node = node.content;
     // console.log("readcontent");
        break;
      default:
        alert("error: non-valid adress: " + arg);
    }
  }

  return node;
}

function injectAtAdress(subst, adress, bignode) {
  if (typeof subst === "string") {
    subst = math.parse(subst);
  }

  // hier mss clone ipv cloneDeep omdat er anders een vuile foutmelding komt (geen idee waarom!)
  
  console.log("bignode");
  console.log(bignode);
  big = bignode;
  
  var equat = bignode.cloneDeep();
  var adressText = "";

  for (i = 0; i < adress.length; i++) {
    arg = adress[i];
    switch (arg.slice(0, 4)) {
      case "root":
        adressText = ""; /* console.log(arg, adressText) */
        break;
      case "args":
        adressText =
          adressText +
          ".args[" +
          /\d+/.exec(arg) +
          "]"; /* console.log(arg, adressText) */
        break;
      case "cont":
        adressText = adressText + ".content"; /* console.log(arg, adressText) */
        break;
      default:
        alert("error: non-valid adress" + arg);
    }
  }

  //   console.log('adrestext:' + adressText + ' subst: ' + subst);
  // PAS OP WANT DIT IS DESTRUCTIEF en vERANDERT DE OORSPRONKELIJKE VARIABELE !!!
  // IS DAT ECHT ZO? CHECK DIT!
  eval("equat" + adressText + "= subst");
  return equat;
}

function test(expr) {
  if (expr.name == 'Times') {
      
      if (expr.args.every(factor => factor.fn = "pow")) {
          console.log('good one');
          baseArray = [];
          exponent = expr.args[0].args[1];
          expr.args.forEach( factor => {if (factor.args[1].equals(exponent)) {baseArray.push(factor.args[0])} });
          console.log('aantal gelijke exp = ' + baseArray.length);
          // powArray = baseArray.map( base => new math.expression.node.FunctionNode('pow', [base, exponent]));
          if (baseArray.length === expr.args.length) {
              product = makeMulti('Times', baseArray);
             macht = new math.expression.node.FunctionNode("pow", [product, exponent]);
             console.log('macht = ' + macht.toString());
             return macht;
          }
      }
  }

}

function deleteAtAdress(adress, bignode) {

  var eq = bignode.cloneDeep();
  var adressText = "";

  for (i = 0; i < adress.length; i++) {
    arg = adress[i];
    switch (arg.slice(0, 4)) {
      case "root":
        adressText = ""; /* console.log(arg, adressText) */
        break;
      case "args":
        adressText =
          adressText +
          ".args[" +
          /\d+/.exec(arg) +
          "]"; /* console.log(arg, adressText) */
        break;
      case "cont":
        adressText = adressText + ".content"; /* console.log(arg, adressText) */
        break;
      default:
        alert("error: non-valid adress" + arg);
    }
  }

  //   console.log('adrestext:' + adressText + ' subst: ' + subst);
  // PAS OP WANT DIT IS DESTRUCTIEF en vERANDERT DE OORSPRONKELIJKE VARIABELE !!!
  // IS DAT ECHT ZO? CHECK DIT!
  console.log(adressText);
  adressText = adressText.slice(0,adressText.length - arg.length);
  eval("equation" + adressText + 'args' + ".splice(1,1)");
  return eq;
}

// zet een Select() rond de gegeven uitdrukking (mag in stringvorm of in objectvorm zijn)
function selectIt(node) {
  if (typeof node === "string") {
    node = math.parse(node);
  }
  return new math.expression.node.FunctionNode("Select", [node]);
}

// vervangt wat nu geselecteerd is in bignode door de opgegeven substitutie (mag in stringvorm of in objectvorm zijn)
// de substitutie moet zelf al een Select bevatten want deze functie voegt die niet toe
function substituteSelected(subst, bignode) {
  if (typeof subst === "string") {
    subst = math.parse(subst);
  }

  // replace in all select adresses
  adresses("Select", bignode).forEach(function(adress) {
    bignode = injectAtAdress(subst, adress, bignode);
  });
  return bignode;
}

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

selected = function(node) {
  var filtered = node.filter(function(node) {
    return node.isFunctionNode && node.name === "Select";
  });

  return filtered;
};

//************************************* */
// UPDATES
//************************************* */

function updateF(nieuweNode, fknopString) {

  try {

    fknopString.value = nieuweNode;
    

    // export the expression to LaTeX
    var latex = nieuweNode
      ? nieuweNode.toTex({
          parenthesis: parenthesis,
          implicit: implicit
        })
      : "";
         console.log('LaTeX expression:', latex);
    var largeLatex = "\\large " + latex;
    var hugeLatex = "\\Huge " + latex;

    // display and re-render the expression
    katex.render(latex, eval(fknopString));
  } catch (err) {
    fknopString.innerHTML = "error!!!";
  }
  

};

function updateEval(node) {
  try {
    antwoord = equation.compile().eval();
    antwoord ? (result.innerHTML = antwoord.toString()) : (result.value = "");
  } catch(err) {
    console.log("exressie kan niet geevalueerd worden");
  }
  
};

function updateLatex(eq) {
  try {
    equation = eq;
    // update expression
    expr.value = eq;

    // export the expression to LaTeX
    var latex = eq
      ? eq.toTex({
          parenthesis: parenthesis,
          implicit: implicit
        })
      : "";
    //      console.log('LaTeX expression:', latex);
    var largeLatex = "\\large " + latex;
    var hugeLatex = "\\Huge " + latex;

    // display and re-render the expression
    katex.render(largeLatex, pretty);
  } catch (err) {
    pretty.innerHTML = "error!!!";
  }
  updateEval(eq);
};

function updateLatexAndFs(eq) {
  updateLatex(eq);

  for (var f in toegekendeRegels) {
     console.log( "ffffffffffffff: " + f);
     console.log( "toegk bew: " + toegekendeRegels[f]);
    var previewArr = naar(eq,toegekendeRegels[f]);
    var knop = f + "_button";
    if (previewArr) {
      updateF(previewArr[1],knop);
    } else {
      // DIT IS TE TRAAG OM ALTIJD TE DOEN dus liever direct de innerHTML
      // updateF(math.parse("geen naar gevonden"),knop);
      eval(knop).innerHTML = "...";
    }
    
  };
  // updateF(naargetal(eq)[1],"f1_button");
  // updateF(naarplus(eq)[1],"f2_button");
};


// verplaatst de selectie naar het gevraagde adress
// past global variabele equation aan!
function MoveSelectToAdress(selectAdress, newAdress, eq) {
  // select eruit halen (dit werkt is getest)
  var cleanedEquation = eq.transform(function(child, path, parent) {
    if (child.fn == "Select") {
      return child.args[0];
    } else {
      return child;
    }
  });
  console.log("cleaned");

  eq = injectAtAdress(
    selectIt(readAtAdress(newAdress, cleanedEquation)),
    newAdress,
    cleanedEquation
  );
  console.log("injected");
  equation = eq;
}

function eqWithSelectMovedToAdress(selectAdress, newAdress, eq) {
  // select eruit halen (dit werkt is getest)
  var cleanedEquation = eq.transform(function(child, path, parent) {
    if (child.fn == "Select") {
      return child.args[0];
    } else {
      return child;
    }
  });
  console.log("cleaned");

  eq = injectAtAdress(
    selectIt(readAtAdress(newAdress, cleanedEquation)),
    newAdress,
    cleanedEquation
  );
  console.log("injected");
  return eq;
}

//************************************* */
// ACTIES
//************************************* */

// applyRule

function applyRule(regelNode,eq) {
 // alert("clicked1" + regelNode.toString());

  prevEquation = eq.cloneDeep();
  selectAdress = adresses("Select", equation)[0];
  selectNode = readAtAdress(selectAdress, equation);

    tweedeVgl = regelNode;
    neweq = new math.expression.node.FunctionNode("And", [
      eq,
      tweedeVgl
    ]);
    
    updateLatex(flatten(neweq));
  
}



  

// laat meerdere selecties toe!!!
function applyPlus() {
  prevEquation = equation.cloneDeep();

  secondTerm = math.parse("Select(b)");

  selectAdresses = adresses("Select", equation);

  // als alle selecties een gelijkheid zijn -> Plus aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      links = new math.expression.node.FunctionNode("Plus", [
        selectNode.args[0].args[0],
        secondTerm
      ]);
      rechts = new math.expression.node.FunctionNode("Plus", [
        selectNode.args[0].args[1],
        secondTerm
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders Plus op de subexpressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      substitution = new math.expression.node.FunctionNode("Plus", [
        selectNode.args[0],
        secondTerm
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  }


  equation = flatten(equation);
  updateLatexAndFs(equation);
}

/* function applyAdd() {

    prevEquation = equation.cloneDeep();
    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    secondTerm = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('+', 'add', [selectNode.args[0], secondTerm]);
    equation = substituteSelected(substitution, equation);
    equation = flattenOp(equation);
    updateLatex(equation);
} */

function replaceWithPlus() {
  //    expr.value = 'Plus(3, Times(3, Select(4), 5), 7)';

  prevEquation = equation.cloneDeep();
  substitution = "Plus(Select(a),b)";

  equation = substituteSelected(substitution, equation);

  updateLatexAndFs(equation);
}

function applyTimes() {
  prevEquation = equation.cloneDeep();

  secondFactor = math.parse("Select(b)");

  selectAdresses = adresses("Select", equation);

  // als alle selecties een gelijkheid zijn -> times aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      links = new math.expression.node.FunctionNode("Times", [
        selectNode.args[0].args[0],
        secondFactor
      ]);
      rechts = new math.expression.node.FunctionNode("Times", [
        selectNode.args[0].args[1],
        secondFactor
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders times van de expressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      substitution = new math.expression.node.FunctionNode("Times", [
        selectNode.args[0],
        secondFactor
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  }
  equation = flatten(equation);
  updateLatexAndFs(equation);
}

/* function applyMultiply() {

    prevEquation = equation.cloneDeep();
    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    secondTerm = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('*', 'multiply', [selectNode.args[0], secondTerm]);
    equation = substituteSelected(substitution, equation);
    equation = flattenOp(equation);
    updateLatex(equation);
} */

function replaceWithTimes() {
  prevEquation = equation.cloneDeep();
  substitution = "Times(Select(a),b)";
  equation = substituteSelected(substitution, equation);
  updateLatexAndFs(equation);
}

function applyPower() {
  prevEquation = equation.cloneDeep();
  exponent = math.parse("Select(b)");

  selectAdresses = adresses("Select", equation);

  // als alle selecties een gelijkheid zijn -> power aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      links = new math.expression.node.FunctionNode("pow", [
        selectNode.args[0].args[0],
        exponent
      ]);
      rechts = new math.expression.node.FunctionNode("pow", [
        selectNode.args[0].args[1],
        exponent
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders power van de expressie

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      substitution = new math.expression.node.FunctionNode("pow", [
        selectNode.args[0],
        exponent
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  }

  updateLatexAndFs(equation);
}

function applyUnaryMinus() {
  prevEquation = equation.cloneDeep();

  selectAdresses = adresses("Select", equation);

  // als alle selecties een gelijkheid zijn -> unaryMinus aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      if (selectNode.args[0].args[0].name == "unaryMinus") {
        links = selectNode.args[0].args[0];
      } else {
        links = new math.expression.node.FunctionNode("unaryMinus", [selectNode.args[0].args[0]]);
      }
      
      if (selectNode.args[0].args[1].name == "unaryMinus") {
         rechts = selectNode.args[0].args[1];
      } else {
        rechts = new math.expression.node.FunctionNode("unaryMinus", [selectNode.args[0].args[1]]);
      }
  
        substitution = new math.expression.node.OperatorNode("==", "equal", [
          selectIt(links),
          selectIt(rechts)
        ]);

      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders unaryMinus van de expressie

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      console.log(item);

      if (selectNode.args[0].name == "unaryMinus") {
      substitution = selectNode.args[0].args[0];
     } else {
      substitution = new math.expression.node.FunctionNode("unaryMinus", [selectNode.args[0]]);
     }

      equation = injectAtAdress(selectIt(substitution), item, equation);
    });
  }

  updateLatexAndFs(equation);
}

function replaceWithPower() {
  prevEquation = equation.cloneDeep();
  base = math.parse("Select(a)");
  exponent = math.parse("b");
  substitution = new math.expression.node.FunctionNode("pow", [base, exponent]);
  equation = substituteSelected(substitution, equation);
  updateLatexAndFs(equation);
}

// function applyMinusOp() {

//     prevEquation = equation.cloneDeep();
//     selectAdress = adresses('Select', equation)[0];
//     selectNode = readAtAdress(selectAdress, equation);
//     substractor = math.parse('Select(-b)');
//     substitution = new math.expression.node.OperatorNode('+','add', [selectNode.args[0], substractor]);
//     equation = substituteSelected(substitution, equation);
//     equation = flattenOp(equation);
//     updateLatex(equation);
// }

function applyMinus() {
  prevEquation = equation.cloneDeep();
  // selectAdress = adresses('Select', equation)[0];
  // selectNode = readAtAdress(selectAdress, equation);
  substractor = new math.expression.node.FunctionNode("unaryMinus", [
    math.parse("Select(c)")
  ]);

  selectAdresses = adresses("Select", equation);

  // als alle selecties een gelijkheid zijn -> aftrekking aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      links = new math.expression.node.FunctionNode("Plus", [
        selectNode.args[0].args[0],
        substractor
      ]);
      rechts = new math.expression.node.FunctionNode("Plus", [
        selectNode.args[0].args[1],
        substractor
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders aftrekking van de expressie

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      substitution = new math.expression.node.FunctionNode("Plus", [
        selectNode.args[0],
        substractor
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  }

  equation = flatten(equation);
  updateLatexAndFs(equation);
}

function replaceWithMinus() {
  prevEquation = equation.cloneDeep();
  substitution = "(Select(a)-b)";
  equation = substituteSelected(substitution, equation);
  updateLatexAndFs(equation);
}

function applyDivide() {
  prevEquation = equation.cloneDeep();

  selectAdresses = adresses("Select", equation);
  divisor = math.parse("Select(b)");

  // als alle selecties een gelijkheid zijn -> deling aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      links = new math.expression.node.OperatorNode("/", "divide", [
        selectNode.args[0].args[0],
        divisor
      ]);
      rechts = new math.expression.node.OperatorNode("/", "divide", [
        selectNode.args[0].args[1],
        divisor
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders divide van de expressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      substitution = new math.expression.node.OperatorNode("/", "divide", [
        selectNode.args[0],
        divisor
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  }

  updateLatexAndFs(equation);
}

function replaceWithDivide() {
  prevEquation = equation.cloneDeep();
  substitution = "Select(a) / b";
  equation = substituteSelected(substitution, equation);
  updateLatexAndFs(equation);
}

function applyNthroot() {
  prevEquation = equation.cloneDeep();

  rootnumber = math.parse("Select(b)");

  selectAdresses = adresses("Select", equation);

  // als alle selecties een gelijkheid zijn -> NthRoot aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      links = new math.expression.node.FunctionNode("nthRoot", [
        selectNode.args[0].args[0],
        rootnumber
      ]);
      rechts = new math.expression.node.FunctionNode("nthRoot", [
        selectNode.args[0].args[1],
        rootnumber
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  } else {
    // anders Nthroot van de expressie
    console.log("gewoon subexps wortelen");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, equation);
      substitution = new math.expression.node.FunctionNode("nthRoot", [
        selectNode.args[0],
        rootnumber
      ]);
      equation = injectAtAdress(substitution, item, equation);
    });
  }

  updateLatexAndFs(equation);
}

function replaceWithNthroot() {
  prevEquation = equation.cloneDeep();
  substitution = "nthRoot(Select(a),b)";
  equation = substituteSelected(substitution, equation);
  updateLatexAndFs(equation);
}

function selectThisEquality(eq) {
  // als Select al de root is: doe niks
  if (eq.fn == "Select") {
    return;
  }
  // bereken het nieuwe adres voor select

  // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties
  selectAdress = adresses("Select", eq)[0];
  console.log("selectAdress: ");
  console.log(selectAdress);

  
  upAdress = returnWithoutLast(selectAdress);
  i = 1;
  console.log('upAdress');
  console.log(upAdress);
  while (upAdress.length > 0) {
    i = i +1
    // if (i==100) { break;}
    upNode = readAtAdress(upAdress,eq);
    console.log(upNode);
    if (upNode.isOperatorNode) {
      if (upNode.fn == 'equal') {
        console.log('equality found!')
        break;
      }
    }
    upAdress.pop()
    // if (upNode == []) {break};
    console.log(i);
  }
  
  console.log(" upAdress: ");
  console.log(upAdress);

  if (upAdress.length>0) {

    console.log('moveselectoadress');
   return eqWithSelectMovedToAdress(selectAdress, upAdress, eq);

  }
}

function applyEquality(eq,extraVgl) {
  prevEquation = equation.cloneDeep();
  selectAdress = adresses("Select", eq)[0];
  selectNode = readAtAdress(selectAdress, eq);

  tweedeVgl = math.parse("Select(a)==b");
  if (extraVgl) {tweedeVgl=extraVgl}
  if (selectNode.args[0].name == "And" || selectNode.args[0].fn == "equal") {

    substitution = new math.expression.node.FunctionNode("And", [
      selectNode.args[0],
      tweedeVgl
    ]);
    // equation = substituteSelected(substitution, equation);
    // updateLatex(flatten(equation));
    // return flatten(substituteSelected(substitution, eq));
    return flatten(substitution);
  } else if (selectAdress == 'root?') {
    console.log('root!!!')
    // equation = new math.expression.node.OperatorNode('==','equal', [equation.args[0], math.parse('Select(b)')]);
    // updateLatex(equation);
    neweq = new math.expression.node.OperatorNode('==','equal', [equation.args[0], math.parse('Select(b)')]);
    return neweq;
  } else {
    console.log('nog geen vgl geselecteerd!');
    
    metEqualityGeselecteerd = selectThisEquality(eq);
    return applyEquality(metEqualityGeselecteerd,extraVgl);
  }

  /* if (selectNode.args[0].fn == 'equal') {

        tweedeVgl = math.parse('Select(a)==b');
        substitution = new math.expression.node.OperatorNode('==','equal', [selectNode.args[0], tweedeVgl]);
        equation = substituteSelected(substitution, equation);
        updateLatex(flatten(equation));
    } */
}

function ontvouwMulti(eq,multi) {
  neweq = eq.transform(function (node, index, parent) {
    if (node.name == multi && node.args.length>2) {
      newMulti = new math.expression.node.FunctionNode(
        multi,
        node.args.slice(1)
      );
      newMultiArgs = [node.args[0],newMulti];
      newnode = new math.expression.node.FunctionNode(
        multi,
        newMultiArgs
      );
      return newnode;
    } else {
      return node;
    }
  })
return neweq;
}

function ontvouwMultis(eq,multis) {
  // kies een multi om te ontvouwen met multis
  multis.forEach(ontvouwMulti(eq,multi));
    
}

function replaceWithEquality() {
  prevEquation = equation.cloneDeep();
  equation = math.parse("y==Select(x)");
  updateLatexAndFs(equation);
}

// Functies sin, cos, tan, f, g, h, integrate, derive, log 
// en de constanten e en pi.

function applyFunction(functieString, eq) {
  console.log('applyFunctionToSelected: ' + functieString);
  prevEquation = equation.cloneDeep();

  selectAdresses = adresses("Select", eq);

  // als alle selecties een gelijkheid zijn -> functie aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      links = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0].args[0])
      ]);
      rechts = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0].args[1])
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  } else {
    // anders functie van de expressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      substitution = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0])
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  }

  updateLatexAndFs(eq);

}

function applyLog(eq) {
  console.log('applyLog');
  prevEquation = equation.cloneDeep();

  selectAdresses = adresses("Select", eq);
  base = math.parse("10");

  // als alle selecties een gelijkheid zijn -> log aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      links = new math.expression.node.FunctionNode("log", [
        selectIt(selectNode.args[0].args[0]),
        base
      ]);
      rechts = new math.expression.node.FunctionNode("log", [
        selectIt(selectNode.args[0].args[1]),
        base
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  } else {
    // anders log van de expressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      substitution = new math.expression.node.FunctionNode("log", [
        selectIt(selectNode.args[0]),
        base
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  }

  updateLatexAndFs(eq);

}

function replaceWithE(eq) {
  console.log('replacewithE');
  prevEquation = equation.cloneDeep();
  substitution = "Select(e)";
  eq = substituteSelected(substitution, eq);
  updateLatexAndFs(eq);
}

function replaceWithPi(eq) {
  console.log('replacewithPi');
  prevEquation = equation.cloneDeep();
  substitution = "Select(pi)";
  eq = substituteSelected(substitution, eq);
  updateLatexAndFs(eq);
}

function applyIntegral(eq) {
  console.log('applyIntegral');

  //  momenteel Int(uitdrukking, variabele) ipv Int(uitdrukking, variabele, ondergrens, bovengrens)

  prevEquation = equation.cloneDeep();
  functieString = 'Int';
  variabele = math.parse('x');
  // ondergrens = math.parse('0');
  // bovengrens = math.parse('x');

  selectAdresses = adresses("Select", eq);

  // als alle selecties een gelijkheid zijn -> functie aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      links = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0].args[0]),
        variabele
      ]);
      rechts = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0].args[1]),
        variabele
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  } else {
    // anders functie van de expressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      substitution = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0]),
        variabele
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  }

  updateLatexAndFs(eq);
}

function applyDerivative(eq) {
  console.log('applyDerivative');

  prevEquation = equation.cloneDeep();
  functieString = 'Derive';
  variabele = math.parse('x');

  selectAdresses = adresses("Select", eq);

  // als alle selecties een gelijkheid zijn -> functie aan beide kanten
  if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
    console.log("vergelijkingen geselecteerd!!");

    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      links = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0].args[0]),
        variabele
      ]);
      rechts = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0].args[1]),
        variabele
      ]);
      substitution = new math.expression.node.OperatorNode("==", "equal", [
        links,
        rechts
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  } else {
    // anders functie van de expressie
    selectAdresses.forEach(function setnodes(item, index) {
      selectNode = readAtAdress(item, eq);
      substitution = new math.expression.node.FunctionNode(functieString, [
        selectIt(selectNode.args[0]),
        variabele
      ]);
      eq = injectAtAdress(substitution, item, eq);
    });
  }

  updateLatexAndFs(eq);

}

function substitueerLetter(vgl, letterString, substitutie) {

newVgl = vgl.cloneDeep();

newVgl.traverse(function(node, index, parent) {

  if (node.name == letterString) {
    indexnum = Number(/\d+/.exec(index));
    parent.args[indexnum] = substitutie;
  }
  
});

return newVgl;
}

function substitueerExpr(vgl, exprNode, substitutie) {

  newVgl = vgl.cloneDeep();
  
  newVgl.traverse(function(node, index, parent) {
  
    if (node.equals(exprNode)) {
      indexnum = Number(/\d+/.exec(index));
      parent.args[indexnum] = substitutie;
    }
    
  });
  
  return newVgl;
  }

function substitueerNaar(eq, locatie) {
  prevEquation = equation.cloneDeep();
  // check of we in een kant van een vgl zitten
  // check of we een letter geselecteerd hebben
  // check of hierboven een vlg staat
selectAdres = adresses("Select", eq)[0];
selectNode = readAtAdress(selectAdres, eq);
pad = buildPath(eq);
parentAdres = returnWithoutLast(selectAdres);
grandParentAdres = returnWithoutLast(parentAdres);
grandParentNode = readAtAdress(grandParentAdres,eq);
vglNummer = Number(/\d+/.exec(parentAdres[parentAdres.length-1]));
lidVanVgl = Number(/\d+/.exec(selectAdres[selectAdres.length-1]));
nummerLaatsteVgl = grandParentNode.args.length
switch (locatie) {
  case "boven": bestemmingVglNummer = vglNummer - 1; break;
  case "onder": bestemmingVglNummer = vglNummer + 1; break;
}

bestemmingBestaat = (bestemmingVglNummer <= nummerLaatsteVgl && bestemmingVglNummer >= 0)

if (pad[parentAdres] == "==" && pad[grandParentAdres] == "And" && bestemmingBestaat && lidVanVgl < 2) {

  console.log('voorwaarden voor substitutie voldaan!')

  // versie waarbij je de te elimineren expressie moet selecteren
  // exprNode = selectNode.args[0];
  // substitutie = readAtAdress(parentAdres,eq).args[1-lidVanVgl];

  // versie waarbij je de te kopieren expressie moet selecteren
  substitutie = selectNode.args[0];
  exprNode = readAtAdress(parentAdres,eq).args[1-lidVanVgl];

  bestemmingVgl = readAtAdress(grandParentAdres,eq).args[bestemmingVglNummer];
  bestemmingVglAdres = grandParentAdres;
  bestemmingVglAdres.push("args[" + (bestemmingVglNummer)+ "]");
  

  // als er aan de overkant een letter staat dan mag je de huidige selectie gebruiken als vervangexpressie ipv de overkant
  // if (substitutie.isSymbolNode) {
  //   console.log('symbool aan andere kant!');
  //   exprNode = substitutie;
  //   substitutie = cleanEquation(readAtAdress(parentAdres,eq).args[lidVanVgl]);
    
  // }

//  alleen voor letters
  // eq = injectAtAdress( selectIt(substitueerLetter(bestemmingVgl, letter, substitutie)), bestemmingVglAdres ,cleanEquation(eq));
  nieuwebestemming = substitueerExpr(bestemmingVgl, exprNode, substitutie);
  if (nieuwebestemming.equals(bestemmingVgl)) {
    console.log("geen substitutiemogelijkheid hierbestemming");
  } else {
    oorsprongAdres = parentAdres;
    //oorsprongAdres.push("args[" + (vglNummer)+ "]");
    console.log('delete op adres: ' + oorsprongAdres);
    deleteAtAdress(oorsprongAdres,eq);
    eq = injectAtAdress( selectIt(nieuwebestemming), bestemmingVglAdres ,cleanEquation(eq));
    
  }
  updateLatexAndFs(flatten(eq));
}
console.log('voorwaarden voor substitutie NIET voldaan!')
}

// Spacebar en Enter

function spaceBar(eq) {
     prevEquation = equation.cloneDeep();
  // selectAdress = adresses('Select', eq)[0];
  // selectNode = readAtAdress(selectAdress, eq);

  selectAdresses = adresses("Select", equation);
  selectAdresses.forEach(function setnodes(item, index) {
    selectNode = readAtAdress(item, equation);

    try {
      ontbindbaarGetal = Number.isInteger(
        math.eval(selectNode.args[0].toString())
      );
    } catch (err) {
      ontbindbaarGetal = false;
    }

    console.log(ontbindbaarGetal);

    if (Number.isInteger(parseFloat(selectNode.args[0].value))) {
      number = selectNode.args[0].value;

      factorTimesArray = factor(number)
        .split("*")
        .reverse();

      newFactorNodes = [];
      k = -1;
      oldFactor = 0;
      factornumber = factorTimesArray.length;
      for (i = 0; i < factornumber; i++) {
        currentFactor = parseInt(factorTimesArray.pop());

        console.log("i: " + i);
        console.log("currentfactor: " + currentFactor);

        if (currentFactor == oldFactor) {
          // exponent maken
          exponent++;
          baseNode = new math.expression.node.ConstantNode(currentFactor);
          exponentNode = new math.expression.node.ConstantNode(exponent);
          newFactorNodes[k] = new math.expression.node.FunctionNode("pow", [
            baseNode,
            exponentNode
          ]);
        } else {
          // gewoon getal maken
          k++;
          console.log(k);
          newFactorNodes[k] = new math.expression.node.ConstantNode(
            currentFactor
          );
          exponent = 1;
        }
        oldFactor = currentFactor;
      }

      // function quickparse(num) {return math.parse(num)};
      // factorNodes = factorTimesArray.map(quickparse);

      // priemOntbinding = math.parse(factor(number));
      priemOntbinding = new math.expression.node.FunctionNode(
        "Times",
        newFactorNodes
      );
      equation = injectAtAdress(selectIt(priemOntbinding), item, equation);
      // equation = substituteSelected(selectIt(priemOntbinding),eq);
      // updateLatex(equation);
    } else if (ontbindbaarGetal) {
      uitkomstString = math.eval(selectNode.args[0].toString());
      console.log(uitkomstString);
      uitkomstNode = selectIt(math.parse(uitkomstString));
      equation = injectAtAdress(uitkomstNode, item, equation);
      // equation = substituteSelected('Select('+uitkomstString+')',eq);
      // updateLatex(equation);
    } else {
              
      try {
        spaceregels.forEach(function (testregel) {
            uitkomst = regelTransformSelected(eq, regels[testregel]);
            if (uitkomst[0]) {
              console.log("nieuwe eq:  " + uitkomst[0].toString());
                updateLatex(uitkomst[0]);
                throw breakException;
            }
        })

      } catch(e) {}
    }
  });
  equation = flatten(equation);
  updateLatex(equation);
}

function enter(eq) {
  prevEquation = equation.cloneDeep();

  selectAdresses = adresses("Select", equation);
  selectAdresses.forEach(function setnodes(item, index) {
    selectNode = readAtAdress(item, equation);

    try {
      uitkomstString = math.eval(selectNode.args[0].toString());
      uitkomstIsInteger = Number.isInteger(uitkomstString);
    } catch (err) {
      uitkomstIsInteger = false;
    }

    if (uitkomstIsInteger) {
      // uitkomstString = math.eval(selectNode.args[0].toString());
      uitkomstString < 0 ? 
      substitution = math.parse("Select(" + '-1*' + -1*uitkomstString + ")") 
      : substitution = math.parse("Select(" + uitkomstString + ")");

      equation = injectAtAdress(substitution, item, equation);
    } else {

    //   eq2 = regelTransformSelected(eq, regels.nulOpslorpendVoorPlus);
    //   eq3 = regelTransformSelected(eq, regels.eenOpslorpendVoorMaal);
    //   eq4 = regelTransformSelected(eq, regels.schrapUnitaireBreuk);
    //   eq5 = regelTransformSelected(eq, regels.omgekeerdeIsInverseVoorMaal1);
    //   eq6 = regelTransformSelected(eq, regels.omgekeerdeIsInverseVoorMaal2);
    //   uitkomsten = [eq2, eq3,eq4,eq5,eq6];
      

   var breakException = {};
    
    try {
    simplificatieregels.forEach(function (testregel) {
        uitkomst = regelTransformSelected(eq, regels[testregel]);
        if (uitkomst[0]) {
          console.log("nieuwe eq:  " + uitkomst[0].toString());
            updateLatex(uitkomst[0]);
 //           throw(e);
        }
    })
    }
    catch(e) { console.Log('fout tijdens simplificatieregels');  };

      // if (eq2.equals(eq) == false) {
      //   console.log("nieuwe eq:  " + eq2.toString());
      //   updateLatex(eq2);
      // } else if (eq3.equals(eq) == false) {
      //   console.log("geen a-a=0, testing a/1=a");
      //   // eq = regelTransformSelected(eq,regels.eenOpslorpendVoorMaal);
      //   console.log("a/1 getest en mss gedaan");
      //   updateLatex(eq3);
      // }
    }
  });

  updateLatex(equation);
}

function backSpace() {
  console.log("equation: ");
  console.log(equation);
  console.log("prevequation: ");
  console.log(prevEquation);
  equation = prevEquation;
  updateLatexAndFs(equation);
}

function leftSelect(eq) {
  // bereken het nieuwe adres voor select
  // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties
  selectAdress = adresses("Select", eq)[0];
  console.log("selectAdress: ");
  console.log(selectAdress);

  // als Select al de root is: doe niks
  if (eq.fn == "Select") {
    return;
  }

  // vind het nummer van dit argument
  if (selectAdress[selectAdress.length - 1] == "content") {
    huidigNummer = 0;
  } else {
    huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
  }

  upAdress = returnWithoutLast(selectAdress);
  console.log("upAdress: ");
  console.log(upAdress);

  upNode = readAtAdress(upAdress, eq);

  upNode.args == undefined
    ? (laatsteNummer = 0)
    : (laatsteNummer = upNode.args.length - 1);
  console.log("laatsteNummer: " + laatsteNummer);

  nieuwNummer = Math.max(0, huidigNummer - 1);
  // omkeren voor een nthroot (want daar staat het tweede argument (de exponent) links
  if (readAtAdress(upAdress, equation).name == "nthRoot") {
    nieuwNummer = Math.min(huidigNummer + 1, laatsteNummer);
  }

  if (selectAdress[selectAdress.length - 1] == "content") {
    leftAdress = upAdress.concat(["content"]);
  } else {
    leftAdress = upAdress.concat(["args[" + nieuwNummer + "]"]);
  }

  console.log("leftAdress: ");
  console.log(leftAdress);

  MoveSelectToAdress(selectAdress, leftAdress, eq);

  updateLatexAndFs(flatten(equation));
}

function rightSelect(eq) {
  // bereken het nieuwe adres voor select
  // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties
  selectAdress = adresses("Select", eq)[0];
  console.log("selectAdress: ");
  console.log(selectAdress);

  // als Select al de root is: doe niks
  if (eq.fn == "Select") {
    return;
  }

  // vind het nummer van dit argument, en het aantal argumenten
  if (selectAdress[selectAdress.length - 1] == "content") {
    huidigNummer = 0;
  } else {
    huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
  }
  console.log("huidigNummer: ");
  console.log(huidigNummer);

  upAdress = returnWithoutLast(selectAdress);
  console.log("upAdress: ");
  console.log(upAdress);

  upNode = readAtAdress(upAdress, eq);

  upNode.args == undefined
    ? (laatsteNummer = 0)
    : (laatsteNummer = upNode.args.length - 1);
  console.log("laatsteNummer: " + laatsteNummer);

  nieuwNummer = Math.min(huidigNummer + 1, laatsteNummer);

  // omkeren voor een nthroot (want daar staat het tweede argument (de exponent) links
  if (upNode.name == "nthRoot") {
    nieuwNummer = Math.max(0, huidigNummer - 1);
  }
  console.log("nieuwNummer: " + nieuwNummer);

  if (selectAdress[selectAdress.length - 1] == "content") {
    rightAdress = upAdress.concat(["content"]);
  } else {
    rightAdress = upAdress.concat(["args[" + nieuwNummer + "]"]);
  }
  console.log("rightAdress: ");
  console.log(rightAdress);

  MoveSelectToAdress(selectAdress, rightAdress, eq);

  // updateLatex(equation);
  updateLatexAndFs(flatten(equation));
}

function upSelect(eq) {
  // als Select al de root is: doe niks
  if (eq.fn == "Select") {
    return;
  }
  // bereken het nieuwe adres voor select

  // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties
  selectAdress = adresses("Select", eq)[0];
  console.log("selectAdress: ");
  console.log(selectAdress);

  upAdress = returnWithoutLast(selectAdress);
  console.log(" upAdress: ");
  console.log(upAdress);

  //     // select eruit halen (dit werkt is getest)
  //     var cleanedEquation = eq.transform(function (child, path, parent) {
  //         if (child.fn == 'Select') {return child.args[0] } else { return child};
  //     });
  // console.log('cleaned');

  //  eq = injectAtAdress(selectIt(readAtAdress(upAdress, cleanedEquation)),upAdress,cleanedEquation);
  //  console.log('injected');
  //  equation = eq;

  MoveSelectToAdress(selectAdress, upAdress, eq);

  equation = flatten(equation);

  updateLatexAndFs(equation);
}

function downSelect(eq, actionName) {
  // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties
  selectAdress = adresses("Select", eq)[0];
  console.log("selectAdress: ");
  console.log(selectAdress);

  selectNode = readAtAdress(selectAdress, eq);

  // als Select een leaf is: doe niks
  if (
    (selectNode.args[0].args == undefined) &
    (selectNode.args[0].content == undefined)
  ) {
    return;
  }
  // ALLEEN ALS GEEN CONTENT ALS CONTENT DAN select.adress.content
  if (selectNode.args[0].content == undefined) {
    downAdress = selectAdress.concat(["args[0]"]);
  } else if (selectNode.args[0].args == undefined) {
    downAdress = selectAdress.concat(["content"]);
  } else {
    return;
  }

  console.log(" downAdress: ");
  console.log(downAdress);

  //     // select eruit halen (dit werkt is getest)
  //     var cleanedEquation = eq.transform(function (child, path, parent) {
  //         if (child.fn == 'Select') {return child.args[0] } else { return child};
  //     });
  // console.log('cleaned');

  //  eq = injectAtAdress(selectIt(readAtAdress(downAdress, cleanedEquation)),downAdress,cleanedEquation);
  //  console.log('injected');
  //  equation = eq;

  MoveSelectToAdress(selectAdress, downAdress, eq);

  // noteer dat er een succesvolle downselect is gebeurd DIT Staat nu gewoon bij de keyhandler functie
  // keysList.push(actionName);

  // update de latexweergave
  updateLatexAndFs(equation);
}

function replaceWithDigit(digit, eq) {
  prevEquation = equation.cloneDeep();


  tijd = new Date();
  nu = tijd.getTime();
  verloop = nu - laatsteDigitOfLetterTijdStip;
  laatsteDigitOfLetterTijdStip = nu;

  if (verloop < 400) {
    inputDigit(Number(digit), equation);
  } else {
    eq = substituteSelected(selectIt(digit), eq);
    updateLatexAndFs(eq);
  }


}

function inputDigit(digit, eq) {
  prevEquation = equation.cloneDeep();
  selectAdress = adresses("Select", eq)[0];
  selectNode = readAtAdress(selectAdress, eq);
  // arg is de node die geselecteerd is
  arg = selectNode.args[0];
  if (arg.isConstantNode) {
    oudGetal = arg.value;

    if (isNaN(oudGetal)) {
    } else {
      nieuwGetal = oudGetal * 10 + digit;
      nieuwGetalNode = new math.expression.node.ConstantNode(nieuwGetal);
      eq = substituteSelected(selectIt(nieuwGetalNode), eq);
      updateLatexAndFs(eq);
    }
  } else {
    eq = substituteSelected(selectIt("" + digit), eq);
    updateLatexAndFs(eq);
  }
}

function replaceWithLetter (letterString, eq) {
  prevEquation = equation.cloneDeep();


  tijd = new Date();
  nu = tijd.getTime();
  verloop = nu - laatsteDigitOfLetterTijdStip;
  laatsteDigitOfLetterTijdStip = nu;

  if (verloop < 400) {
    console.log(verloop);
    selectAdress = adresses("Select", eq)[0];
    selectNode = readAtAdress(selectAdress, eq);
    letterNode = math.parse('Select('+letterString+')');
    substitution = new math.expression.node.FunctionNode("Times", [selectNode.args[0],letterNode])

    eq = substituteSelected(substitution, eq);
    eq = flatten(eq);
    updateLatexAndFs(eq);
} else {
  eq = substituteSelected(selectIt(letterString), eq);
  updateLatexAndFs(eq);
}
}


// SHIFT toetsen

// TEstcase: Times(2,3,Select(Times(6,7)),Times(8,9),10)

function rightSlurp(eq) {
  // zoek uit of de parent een multifunction is
  selectAdress = adresses("Select", eq)[0];
  parentAdress = returnWithoutLast(selectAdress);
  parentNode = readAtAdress(parentAdress, eq);
  if (parentNode.type == "FunctionNode") {
    if (multiFunction[parentNode.name] == 1) {
      selectNode = readAtAdress(selectAdress, eq);

      huidigNummer = Number(
        /\d+/.exec(selectAdress[selectAdress.length - 1])[0]
      );
      if (huidigNummer < parentNode.args.length - 1) {
        first = selectNode.args[0];
        secondAdress = selectAdress;

        secondAdress[secondAdress.length - 1] =
          "args[" + (huidigNummer + 1) + "]";
        second = readAtAdress(secondAdress, eq);

        newSelection = new math.expression.node.FunctionNode(parentNode.name, [
          first,
          second
        ]);
        newSelection = selectIt(flatten(newSelection));

        newParent = parentNode;
        newParent.args.splice(huidigNummer, 2, newSelection);
        eq = injectAtAdress(newParent, parentAdress, eq);

        // MSS ZIJN DE VOLGENDE TWEE LIJNEN OVERBODIG?
        eq = flatten(eq);
        updateLatexAndFs(eq);

        return eq;
      }
    } else {
      return eq;
    }
  }
}

/* 
function rightSlurpOp(eq) {

    // zoek uit of de parent een multifunction is
    selectAdress = adresses('Select', eq)[0];
    parentAdress = returnWithoutLast(selectAdress);
    parentNode = readAtAdress(parentAdress, eq);
    if (parentNode.type == 'OperatorNode') {
        if (multiFunction[parentNode.fn] == 1) {


            selectNode = readAtAdress(selectAdress, eq);

            
            huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
            if (huidigNummer < parentNode.args.length - 1) {

                first = selectNode.args[0];
                secondAdress = selectAdress;

                secondAdress[secondAdress.length - 1] = 'args[' + (huidigNummer + 1) + ']';
                second = readAtAdress(secondAdress, eq);


                newSelection = new math.expression.node.OperatorNode(parentNode.op, parentNode.fn, [first, second]);
                newSelection = selectIt(flattenOp(newSelection));

                newParent = parentNode;
                newParent.args.splice(huidigNummer, 2, newSelection)
                eq = injectAtAdress(newParent, parentAdress, eq);

                //updateLatex(equation);

                return eq;
            };
        } else {
            return eq;
        };
    };
}; */

function leftSlurp(eq) {
  // zoek uit of de parent een multifunction is
  selectAdress = adresses("Select", eq)[0];
  parentAdress = returnWithoutLast(selectAdress);
  parentNode = readAtAdress(parentAdress, eq);
  if (parentNode.type == "FunctionNode") {
    if (multiFunction[parentNode.name] == 1) {
      selectNode = readAtAdress(selectAdress, eq);

      first = selectNode.args[0];
      secondAdress = selectAdress;
      huidigNummer = Number(
        /\d+/.exec(selectAdress[selectAdress.length - 1])[0]
      );
      if (huidigNummer > 0) {
        secondAdress[secondAdress.length - 1] =
          "args[" + (huidigNummer - 1) + "]";
        second = readAtAdress(secondAdress, eq);

        // de tweede wordt hier eerst gezet
        newSelection = new math.expression.node.FunctionNode(parentNode.name, [
          second,
          first
        ]);
        newSelection = selectIt(flatten(newSelection));

        newParent = parentNode;
        newParent.args.splice(huidigNummer - 1, 2, newSelection);
        eq = injectAtAdress(newParent, parentAdress, eq);

        // MSS ZIJN DE VOLGENDE TWEE LIJNEN OVERBODIG?
        eq = flatten(eq);
        updateLatexAndFs(eq);

        return eq;
      }
    } else {
      return eq;
    }
  }
}
/* 
function leftSlurpOp(eq) {

    // zoek uit of de parent een multifunction is
    selectAdress = adresses('Select', eq)[0];
    parentAdress = returnWithoutLast(selectAdress);
    parentNode = readAtAdress(parentAdress, eq);
    if (parentNode.type == 'OperatorNode') {
        if (multiFunction[parentNode.fn] == 1) {


            selectNode = readAtAdress(selectAdress, eq);

            first = selectNode.args[0];
            secondAdress = selectAdress;
            huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
            if (huidigNummer > 0) {

                secondAdress[secondAdress.length - 1] = 'args[' + (huidigNummer - 1) + ']';
                second = readAtAdress(secondAdress, eq);

// de tweede wordt hier eerst gezet
                newSelection = new math.expression.node.OperatorNode(parentNode.op, parentNode.fn, [second, first]);
                newSelection = selectIt(flattenOp(newSelection));

                newParent = parentNode;
                newParent.args.splice(huidigNummer-1, 2, newSelection);
                eq = injectAtAdress(newParent, parentAdress, eq);

                updateLatex(equation);

                return eq;
            };
        } else {
            return eq;
        };
    };
}; */

/****************************** */
// Alt - acties
/****************************** */

// deze code is bijna exact hetzelfde als rightSlurp
commuteSelectedWithNext = function(eq) {
  // zoek uit of de parent een multifunction is
  selectAdress = adresses("Select", eq)[0];
  parentAdress = returnWithoutLast(selectAdress);
  parentNode = readAtAdress(parentAdress, eq);
  if (parentNode.type == "FunctionNode") {
    if (multiFunction[parentNode.name] == 1) {
      selectNode = readAtAdress(selectAdress, eq);

      huidigNummer = Number(
        /\d+/.exec(selectAdress[selectAdress.length - 1])[0]
      );
      if (huidigNummer < parentNode.args.length - 1) {
        first = selectNode.args[0];
        secondAdress = selectAdress;

        secondAdress[secondAdress.length - 1] =
          "args[" + (huidigNummer + 1) + "]";
        second = readAtAdress(secondAdress, eq);

        // in dd volgende twee lijnen is het enige verschil met de rightSlurp:
        newSelection = new math.expression.node.FunctionNode(parentNode.name, [
          second,
          selectNode
        ]);

        newSelection = flatten(newSelection);

        //console.log(newSelection);

        newParent = parentNode;
        newParent.args.splice(huidigNummer, 2, newSelection);
        eq = injectAtAdress(newParent, parentAdress, eq);

        eq = flatten(eq);
        updateLatexAndFs(eq);

        return eq;
      }
    } else {
      return eq;
    }
  }
};

// deze code is bijna exact hetzelfde als slurpLeft
function commuteSelectedWithPrevious(eq) {
  // zoek uit of de parent een multifunction is
  selectAdress = adresses("Select", eq)[0];
  parentAdress = returnWithoutLast(selectAdress);
  parentNode = readAtAdress(parentAdress, eq);
  if (parentNode.type == "FunctionNode") {
    if (multiFunction[parentNode.name] == 1) {
      selectNode = readAtAdress(selectAdress, eq);

      first = selectNode.args[0];
      secondAdress = selectAdress;
      huidigNummer = Number(
        /\d+/.exec(selectAdress[selectAdress.length - 1])[0]
      );
      if (huidigNummer > 0) {
        secondAdress[secondAdress.length - 1] =
          "args[" + (huidigNummer - 1) + "]";
        second = readAtAdress(secondAdress, eq);

        // de tweede wordt hier eerst gezet
        newSelection = new math.expression.node.FunctionNode(parentNode.name, [
          selectNode,
          second
        ]);
        newSelection = flatten(newSelection);

        console.log("newselect: " + newSelection.toString());

        newParent = parentNode;
        newParent.args.splice(huidigNummer - 1, 2, newSelection);
        eq = injectAtAdress(newParent, parentAdress, eq);

        eq = flatten(eq);
        updateLatexAndFs(eq);

        return eq;
      }
    } else {
      return eq;
    }
  }
}

//***************************** */
// CTRL - functies (rekenregels)
//***************************** */


// DEZE functies zijn samengevoegd tot distributeOrFactorSelected

// function distributeSelected(eq) {
//   selectAdress = adresses("Select", eq)[0];
//   selectNode = readAtAdress(selectAdress, eq);
//   selectedNode = selectNode.args[0];

//   if ((selectedNode.name == "Times") & (selectedNode.args[1].name == "Plus")) {
//     nieuw = selectedNode.args[1].map(function(node, index, parent) {
//       return new math.expression.node.FunctionNode("Times", [
//         selectedNode.args[0],
//         node
//       ]);
//     });
//   }
//   eq = injectAtAdress(selectIt(nieuw), selectAdress, eq);
//   return eq;
// }

// function factorSelected(eq) {
//   selectAdress = adresses("Select", eq)[0];
//   selectNode = readAtAdress(selectAdress, eq);
//   selectedNode = selectNode.args[0];

//   var sameFactor = true;

//   if (selectedNode.name == "Plus") {
//     commonFactor = selectedNode.args[0].args[0];
//     selectedNode.args.forEach(function(node, index, parent) {
//       node.args[0].equals(commonFactor)
//         ? (sameFactor = sameFactor)
//         : (sameFactor = false);
//     });
//     nieuweSom = selectedNode.map(function(node, index, parent) {
//       return node.args[1];
//     });
//     nieuw = new math.expression.node.FunctionNode("Times", [
//       commonFactor,
//       nieuweSom
//     ]);
//   }
//   eq = injectAtAdress(selectIt(nieuw), selectAdress, eq);
//   return eq;
// }


// TODO: deze functie is mega unsafe
function distributeOrFactorSelectedLeft(eq) {
  selectAdress = adresses("Select", eq)[0];
  selectNode = readAtAdress(selectAdress, eq);
  selectedNode = selectNode.args[0];

  var sameFactor = true;
  var nieuw = {};

  // hier zou ik eignelijk moeten checken of er geen args[2] is want dan mag er al een break komen
  if ((selectedNode.name == "Times") & (selectedNode.args[1].name == "Plus")) {
    nieuw = selectedNode.args[1].map(function(node, index, parent) {
      return new math.expression.node.FunctionNode("Times", [
        selectedNode.args[0],
        node
      ]);
    });
    // hier zou ik moeten breaken als de common factor er niet is; nu maakt het niks uit als sameFactor=false
  } else if (selectedNode.name == "Plus") {
    commonFactor = selectedNode.args[0].args[0];
    selectedNode.args.forEach(function(node, index, parent) {
      node.args[0].equals(commonFactor)
        ? (sameFactor = sameFactor)
        : (sameFactor = false);
    });
    nieuweSom = selectedNode.map(function(node, index, parent) {
      return node.args[1];
    });
    nieuw = new math.expression.node.FunctionNode("Times", [
      commonFactor,
      nieuweSom
    ]);
  }
  eq = injectAtAdress(selectIt(nieuw), selectAdress, eq);
  return eq;
}

// ctrl-downfunctie

function ctrldownfun(eq) {

 eq = herbalanceertermen(eq, 'neerwaarts')
 uitgedeeld = naar(eq,'uitdeelregels');
 if (uitgedeeld) {eq = uitgedeeld[0]};
 return eq;
}

// ctrl up functie

function ctrlupfun(eq) {

  eq = herbalanceertermen(eq, 'opwaarts')
  buitengehaald = naar(eq,'buitenhaalregels');
  if (buitengehaald) {eq = buitengehaald[0]};
  return eq;
 }

// functies om getallen te splitsen in termen


function herbalanceertermen(eq, richting) {
selectAdress = adresses("Select", eq)[0];
selectNode = readAtAdress(selectAdress, eq);
selectedNode = selectNode.args[0];

if (richting == 'opwaarts') {sprong = -1}
if (richting == 'neerwaarts') {sprong = 1}

// nieuweSom initialiseren
nieuwesom = null;

// als het een gewone integer is
if (selectedNode.isConstantNode) {
   getal = selectedNode.value;

// getal direct eentje aftrekken of bijdoen
    
//   if (Number.isInteger(getal)) {
//     nieuwlinksgetal = getal + sprong;
//     nieuwesom = math.parse( nieuwlinksgetal +"+"+ -sprong)
//     }
// }

// beter is: eerst getal + 0 van maken

  if (Number.isInteger(getal)) {
    nieuwesom = math.parse( "Plus("+ getal + "," +  0 + ")")
    }
} else {

  if ((selectedNode.name == 'Plus') & (selectedNode.args.length == 2)) {
    links = selectedNode.args[0]; linkswaarde = links.value;
    rechts = selectedNode.args[1]; rechtswaarde = rechts.value;
    if (links.name == 'unaryMinus') {links = links.args[0]; linkswaarde = links.value * -1;}
    if (rechts.name == 'unaryMinus') {rechts = rechts.args[0]; rechtswaarde = rechts.value * -1;}

    if (links.isConstantNode & rechts.isConstantNode) {
  
      if (Number.isInteger(linkswaarde) & Number.isInteger(rechtswaarde)) {
        nieuwesom = new math.expression.node.FunctionNode("Plus", [
        ((linkswaarde - sprong) < 0)? math.parse( "" + 'unaryMinus('+(sprong - linkswaarde)+")" ) : math.parse( "" + (linkswaarde - sprong) ),
        ((rechtswaarde + sprong) < 0)? math.parse( "" + 'unaryMinus('+(-sprong - rechtswaarde)+")" ) : math.parse( "" + (rechtswaarde + sprong) )
      ]);
      }
  
    }
  }


}







// als selectie een gewonen integer is -> maak er een som van met 1 + (n-1)
// als selectie een som van twee integers is -> verhoog linkse en verlaag rechtse (of omgekeerd)

if (nieuwesom) {eq = injectAtAdress(selectIt(nieuwesom), selectAdress, eq);}
return eq;

}



//***************************** */
// Grafiek functies
//***************************** */

function drawGraph(eq) {
  if (eq != undefined) {
    //              console.log(eq.toString())
    leftSideCode = eq.args[0].compile();
    rightSideCode = eq.args[1].compile();

    var imageArray = [];

    startX = -100;
    endX = 100;
    startY = -100;
    endY = 100;
    rangeX = endX - startX;
    rangeY = endY - startY;

    for (i = 0; i < canvasWidth; i = i + 1) {
      for (j = 0; j < canvasHeight; j = j + 1) {
        scope = {
          x: startX + rangeX / canvasWidth * i,
          y: startY + rangeY / canvasHeight * j
        };
        squaredDifference = math.pow(
          leftSideCode.eval(scope) - rightSideCode.eval(scope),
          2
        );
        imageArray.push({
          pixelX: i,
          pixelY: canvasHeight - j,
          result: squaredDifference
        });
      }
    }

    minResult = arrayResultRange(imageArray).min;
    resultRange = arrayResultRange(imageArray).max - minResult;
    console.log(minResult);
    console.log(resultRange);

    imageArray.forEach(function(point) {
      // fullSmooth = 255-Math.floor(255*(point.result-minResult)/resultRange);
      // logDiff = math.log(point.result);
      // squareDiff = 255 - point.result;
      drawPixel(point.pixelX, point.pixelY, 0, 0, 0, 10*logDiff(point.result));
    });

    updateCanvas();
  }
}

// komt van internet zou sneller moeten zijn dan alternatieven
function arrayResultRange(arr) {
  var len = arr.length,
    max = -Infinity,
    min = Infinity;
  while (len--) {
    if (arr[len].result > max) {
      max = arr[len].result;
    }
    if (arr[len].result < min) {
      min = arr[len].result;
    }
  }
  return { max: max, min: min };
}

// diff Functies voor de grafieken, verwachten dat minResult, resultRange gegeven zijn. Input is een squaredDifference
function fullSmooth(sqdiff) {
  return 255 - Math.floor(255 * (sqdiff - minResult) / resultRange);
}
function squareDiff(sqdiff) {
  return 255 - sqdiff;
}
function logDiff(sqdiff) {
  return math.log(sqdiff);
}

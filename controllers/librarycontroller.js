var express = require('express');
var bodyParser = require('body-parser');
var Library = require('../Models/Library');

var router = express.Router();



var myBookArray = [{
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIWSURBVDjLjZNPSBRRHMf32rVTdFOsDkJEhODNLGqXukgJpmiEURBGdEnbskNktrhCRQuaLEEikUhlbK5EiZmxjbWwfxvL0dHdtdlCx3VtZxyaed/eG5qwZct98DnM4/f9vN/M+40NgK1Y5p7tPTY9UIeZ4Q6EvIcQ9pQ3FR1O+kvqpbFWZCI+YG0RK5EhBNz2dFHhxIvSWjl+TdOSzyGNd0GJPoE+P4nogzPqpuGUv8wux64ahjIJZbYFy1Pnwfc3I9LXuDR1t2bnf8PC0xKHHL0MQw0gJ5yEmmhA9pMTYm9VOth9cA+rsdV1jm6lDFA0Cizabl6H9KH1d7gJ6kI9VmNXIHiqs5/dFfusQ5hg+PGbL/ipG7CWxPvAv7wEQ5mAKjZjPdGIDO2E9xwmgS7Hjo1dMoFuEIKMQvAtS8C9eoT4iBNh/22kuFrkxAYsh9ow661Bp9fHuqv4S9DiGTdPTa8SfM0QDLoOANl5TN8/jjHndrzrceCt2w71uwDXYJAJjhQULNJwQia4cXY3tMA9aNwdcB37MXRuF4Ih3qwpKLBegbUvLhGcqN6GW6fK8dp1FBP9F/AxvoBwSjcF7Q/fM0FlvsD8iEyycbFuQknDFLPl40QWnqFsyRdY16hbV+gdjf8Rraytm890P0opy5+VggNECwVJzllBldL+r2ErFO7uHYmx4A/Kxc1GPT9cSpmjnC72L/0FRS76cD+dhSEAAAAASUVORK5CYII=",
  "title": "Lemming",
  "author": "Damaris Celiz",
  "numberOfPages": 318,
  "publishDate": "10/24/2000",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHtSURBVDjLY/j//z8DJZiBKgY49drM9J3idhLEtu+xjvea4nLNqsVspnWr2S6QmF6+Zol2ltpq5QSlmcpxijMxDABp9pjkuMuu28rIpsMi3rLZFKzIus38mm6OuqRxpf41nC5w7rOJd+i1ngnUXGLTbj7Tsskk3rbL8ppZreEu7Ry1mWpJSvHK8Uoz0TWK5U/nYIg8y8rgPsl+l12P1WqgbTPdJtk/AtoWb1CkBdagnqyyWilawVM/Rw/FBQyx540ZGm/eYIg8P43BdYLdSZiEcYXeTJB/TaoNroH8q5OldVIhXE5SKUqhXSNRfZdKvPKVkOrED+L9d/8wN998w+B4XIL40I48K8FQf/O6+7In/7mbb35hsD2qjBKNDLU3ExjKb7pi1Rx61ke89+6fwBVP/jPXXn/HYHlYGiMdMJTe1JJc/PgHQ/X1xQyplznBYuFnmRiiz062nPfof8DSJ/8ZSq8/ZzA9KIEzIQE1Vvuuf/6fufv2M4bgsz4MxVdPui8Cal4C1Jx/+RGDPqpmTANiz7MAvXI+bO2L/5ZzHvzP2Pjif8DCx/8ZMi/fY9DcL0FUUmbwPKkg3Hr7T+WOV//95j/8z5B6/jaD6l4JkvIC0J9FTtPu/2dIPn+PQXG3BFmZiUFzbweDLH7NVMmNAOGld33BRiNUAAAAAElFTkSuQmCC",
  "title": "Injury to One, An",
  "author": "Eduino Pietersen",
  "numberOfPages": 482,
  "publishDate": "12/16/1991",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHsSURBVDjLtZPpTlpRFIV5Dt7AOESr1kYNThGnSomIihPoNVi5Qp3RgBgvEERpRW1BRBAcMEDUtIkdjKk4otK0Jdr2vgxZ3kA0MYoaG3+cX2evb529zt4sAKz/OawnASgCBNm5LaE7vjVDutkA4mMdLV4TkvcCuvba2Iqd1pDhWA33mQU+2oXVv07YfpoxuNWFuqVXoeqFCnZcgJwRm04p+Gk3Fs9t8PyZx/K5Hfbf03CGLRj62g2+rSR0K0D+vZXUB1Xw/ou5usJWjAaU0Gz3w/rjHey/ZjDLvKTD34KSyXzyBkC2JaYd4feMqyNa3OQTREQePlXjrqSq5ssj5hMjTMd66ALDKDLm0jcA0s+NID6JIFmvQaNXANEKX3l5x7NyqTcb7Zg8GYtCOLoXuPcbha6XV0VlU4WUzE9gPKjF2CGFbE3G3QAmafDnShETF3iKTZyIblcNza4Syi/deD6USscFCJwV6Fwn8NonQak5Hy1L9TAcjkJ/oAG1p0a1hYdnfcnkrQCBoxyyNYLp1YCJoB7GIwqGgxGod/oZsQoNDiHSepNCceeAN8uF1CvGxJE25rofc+3blKPqQ2VUnKxIYN85yty3eWh216LeKUTOSCayVGlIH0g5S+1JJB+8Cxxt1rWkH7WNTNIPAlwA9Gm7OcXUHxUAAAAASUVORK5CYII=",
  "title": "Splash",
  "author": "Field Ziemke",
  "numberOfPages": 409,
  "publishDate": "7/17/2006",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG5SURBVBgZpcG7b41xAMfhz/v2SJ1qI2nVedXtD0ClsdpIdDARBlKRaEIMLP4OCZNYJGIQl0EQiYnJytSRRA8nLnGrSy+/z1dHObH1eapLL86FVUlIQgyX91+v+I+zT2aiQcUSVGpWdQa3sL29kxhMmovPZ0Ofs09momkQOu2GzlAHi9RJSEJnsGFrewct1vU09LOIxd6m9jhbh7cxULVQqWPo/X7Pm4U3DFcb2L1xkij9imFq8z5GWiN0v3d5/fk1pUhtQimlefezy2CrTZUKS+hnkQTWt4bofuuiNhapknDh2ZnEoEElhmvTNyv+cere8ahosIjKnZkHVZWEtahZo5o1qlmjFqtmH52MBouoaLh17G7FP47cOJwYLKJB5fH5p1U9++hkLDYDGWDX2B4mx6ewSD9LmJzYy66J3ahomumrB1NbRNMbWz/Ot99fWV5ZwiL9VBbLEl9+fWHT8DhV6KnUFmmGJhgdHOXH4gKv3r9EpZ9F5ubnWFpeobOxw+jwGDG0ivJn+Q/zi/N8XPhAKTZqjz4aiovN/Ke3PUshBhOqE7ePRsUiGlTun35Y8R+HrhxIDCbEkIS/gKBKja+GF3wAAAAASUVORK5CYII=",
  "title": "Lasa y Zabala",
  "author": "Cyrillus Reglar",
  "numberOfPages": 190,
  "publishDate": "10/8/2002",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF6SURBVDjLjZO/S8NAFMe/l8Q0ASUUXRwK9R9wFDfdunV19Q9wcmg3/wHp4FLo4CA4Ce3o6OLWUZwKpbRLMdDFCKH5dd73SkvQkvTgeLnLe5/3vXfvhJQSu4xutyuDIEC73Rb5fQM7jizLMBwO/+1b+UWv1+soRZdCiGO1PFJzT33r4Hq9DsuyigFRFN02Gg1UKpWNc5qmehJimmYxgE6e5+GsX4VrZQgzHlfiwI7xdP5VroAOzCZMidaFgGVIENH5sPAdZeUAwzAQxzGECrSpVt0Qq0ygErKbAh5DqOC7dxWj0gtKEGSl5QAWiYCX009t18Wj9UxvK8DYBugHz3hN+hiNRnp9+PAINlzpLawBTedqlflkpcC/uUYVKFewrsF4PNZ2MpnozLPZbJOg9AgMYNdx0BJUq9U2CQoBvEYGzOdz2LYN3/fhOA4Wi4UG839hDVTf/4RhuJ9XwLdAy/5Qr1EWAqbT6f1gMGgul0sdmAMjSRK4rvv2F/ALQmi5wbpDa1QAAAAASUVORK5CYII=",
  "title": "Fast & Furious 6 (Fast and the Furious 6, The)",
  "author": "Roman Antonacci",
  "numberOfPages": 74,
  "publishDate": "11/11/1994",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLjZNPaxNBGIdrLwURLznWgkcvIrQhRw9FGgy01IY0TVsQ0q6GFkT0kwjJId9AP4AHP4Q9FO2hJ7El2+yf7OzMbja7Sf0578QdNybFLjwszLu/Z2femZkDMEfI54FkRVL4Dw8l8zqXEawMBgM2HA6vR6MRZiHraDabH7KSrKBA4SAIEIahxvd9eJ6HbrerJKZpotVqaUkavkMC+iCKIsRxrN6EEAKMMViWpQT9fh/0k3a7PZZkBUPmqXAKCSjAOYdt21NLUj1JBYW7C6vi6BC8vKWKQXUXQcNA5Nh6KY7jqJl0Op1JwY/Hi7mLp/lT/uoA/OX2WLC3C9FoQBwfILKulIRmQv1wXfevwHmyuMPXS5Fv1MHrFSTmhSomnUvw/Spo3C+vg3/+pJZDPSGRFvilNV+8PUZvoziKvn+d3LZvJ/BelMDevIZXK2EQCiUhtMDM53bY5rOIGXtwjU3EVz/HM5Az8eplqPFKEfzLR91cOg8TPTgr3MudFx+d9owK7KMNVfQOtyQ1OO9qiHsWkiRRUHhKQLuwfH9+1XpfhVVfU0V3//k4zFwdzjIlSA/Sv8jTOZObBL9uugczuNaCP5K8bFBIhduE5bdC3d6MYIkkt7jOKXT1l34DkIu9e0agZjoAAAAASUVORK5CYII=",
  "title": "Hava Nagila: The Movie",
  "author": "Chastity Caldayrou",
  "numberOfPages": 453,
  "publishDate": "3/16/1998",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHXSURBVBgZpcE/S5VhGMfx7+8+T2VI0SDVKvYSrKE/0FsIwgZpCFqiISSiIcoigkIosWyrOR16AU2NETSGZUQoiNYgBJ1znufcz3VdeUvOIX4+igj2QhemFq6fPT/+ZLMXwxGAO+GOuREeeDhhhkcQZpg7h/fn7tLS2u23Tyfmq/Ez43P7hobTsSF2Y7jbszlgvurlSL3NP+xWP0diSxUWPJo8wW5dfbxCUUU4xaA1AggPzMEJ3ANzx9rA2sDCGVgwevwQ5kZREUGhJBRBJBEK5CIlISUkQ52g44mqDQpvjaIyN4oEhASCToAL3INOQFKHSmAKLDmFm1NU4cE2CSJIQEggkCAscMHsp4d4G9w4eY/C3SiSu7FDEkgUCUgSqhIzH+7SH3TpNr+ZfjdF4e4Uqc2ZbRKSKCSBhHnL/fc3yblhbGSM0aNj1LnLlVeT5NxQpDCn6AACJCFAwPOPM/zcXKeuG+p2QN02HNh/kNWNFX6lBYrk7uwQkIAk0ZG4dfoOry++YXn1G02uaXLN8vdlZi+/ZCRfoqjWfqwsXnuWJ9wMN8fMcHcsZ9wdj6B/pKbfNmTLbKxvMD37hS2LbFFE8D/nHpyKpsnkOjMYZD6/+Cr+UUSwF38B/pkb32XiUiUAAAAASUVORK5CYII=",
  "title": "NeverEnding Story II: The Next Chapter, The",
  "author": "Dominique Fobidge",
  "numberOfPages": 137,
  "publishDate": "10/15/2016",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKZSURBVDjLfVNLSFRhFP7uYx44XbyjFommzaKVEkVWRoFY9IYKLGgRLQpqKbhxEYSLiAipcVMLxXalWYuKCIVkiIQ2jaORUiRa+Jg0nNHJx/W+Oue/MwP2+i/nP/+995zv+85//l9yXRf/G/F4/IFlWRdM01TJg7ywtbU19l3SvwCGhoYKKaFD1/WzgUABDEqC40BEU044rKO39xXUvyUnEoljnFxSUlIWCoUwPjEFZnccF47rEJALm8AMw4A6Ojpq2LbtJxNBOZnsU6nU75IxP58iIAeHjxwX31ROLi+vQDq9INhdflxW6QrjF+JEUbgQL54/Q1X1TsHO/4QCRuXk5o44hUmQJJq9SXi2zOIibl/ZLRgH4+/AaktPnvYUsFRm5cBwUTFkWYZEJmeN1wzgOh5j9fYasXazeyCzAnonABmKoqwzOet58OYx45w2js50VJQlFJjZ9kiyBEVV8+zCcwnkvc55jJ2f2rGUsYQKAcATbwiXwIyRTQWifm9ImF6wxGp1oBs1g+2o7Z+FpRdjyeygrkgegJytk23s85/nojYTg//LR9RdakIgUoWV4T6MvH2NslTYA/D5VNy6vEO0xzQtLC8bQrLf76MyXCy0NmPbmUYEx2LAmxsoKNSxtaISk2MJqFTXnVisvy53UMgXaZoW4e4kk0mD1AVqf8wguDkCnGjKq1JbSqEZP7HuLrS1tTUSyKk9e/cd1DQdT588WqGeP9w/fO9ifcM5X+jbSxgrSSxTbGZRQWI8aOUBotHoRmrZbH39IWzQNDrKNlRFJtC7Sw0zj1v9WujalmJLVeVJZOYsTHxXbHPVvZ6/TCR9nux9T0/3rtz5z96LkQNdUy0D5ytWP3ydvqrYUqWtyFN0lO4f7bNu/gJT+aqduOCVCAAAAABJRU5ErkJggg==",
  "title": "Laffghanistan: Comedy Down Range",
  "author": "Scarface Hardes",
  "numberOfPages": 117,
  "publishDate": "8/28/2000",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALTSURBVDjLpZN9LBRgHMf1R/NPuo7Uam0aaV7G2uSvYki6c4hhWZe3mJw6i9FxnMj7RUNeIzYvnUtLuXKGXDV2yMm9JK10iDHlvOTuvN6369Zs1kZbf3y2Z8/2+ezZ8zw/PQB6/8NfG1H2B1n5JMPlAsoBsEkEsFyISqqdccY/Ba7ZGTJKvYiaygBDVGi570tEtjsBMY77NRRbo7RdA2UUAmq0IlsrZVN+Q0SmhzHinQ1xxY6wuGsg23Ef2sqSMclno7cqBtFOxoh1PYLr500RcYa4Vpvgqb9joDLIZE498wmLPWWY6rgHMfc25C9zoZCLwIk0Wxxttr800hCAz88zMfTQDeIS66BtgSKqVbei/xFmB5qgGuJoadStFSIO+BkWX6e7GFiQvAB+TmFe8gTCPNLMlnyY0rDX/GxULYd+GisDVVDLmnWo3jdAwLbFd2nK5uq3Fky/vguV9Ck2xrohrYlQ62Rjd46+EamedozUCdnEMrhJXmhM8tTRnucChYyFTVU3VKM3MNdPx8e6MEgqA3/0F/mc1DMic/cYuHFDTDy6MTypQv0kECsDaH1AVocACmkiNtVCKL8EQz1BxdIwE/IKpxlRvusp3SVa+1Z7u/qx0dS7gXIxQBdqECnQIJXzDNPvGH/kIKjHL2NRlgRZoRtiIyJTt15hMNliY5aXgOJqHkL4QFgrwKrjQdp2S3vst1DLw7AyEYgF7UlGSi5gtiUewjjLta2AmGWpUbTfQUBEDTI6lIgr4uBDKxNifgEm+/yhlFMxN5QASakPAsNLMd+Zjn6GlWYrIK2lJ4oSzddDQ7PW7UMEeJx7Dlgaw8gDP3Qxj6KnnAx+DhkuflWghzOVgym2K1onfdtHkjfSDFKYGUbHvXnlaeE2WBUWY7WvEH2Zzqi/agYHcq7ixMWW9pvRqYfGuTSDHafR34Gozg62WH+VQ17vzHd5w2PYmO40zr8A5dG3M3vHNHcAAAAASUVORK5CYII=",
  "title": "Stargate: The Ark of Truth",
  "author": "Alessandra Goodenough",
  "numberOfPages": 388,
  "publishDate": "4/28/2001",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI9SURBVDjLpVNLSJRhFD2f/+QThVHKJ41Ti0pblCAKrtJQ7LGT0E21CUEisFUtioIeIEGLICkwahUtooW4aAQTcahNBWE1gWOY4yQIio8c5/vuo8X8jYuCBO/mfmdxD+ee+x2jqthJ5WCHFYg97U8wc7UIg5nA7EDkQGSz3TkLIhs5dWu84y8CZq7e09IJVYayQIUgwlAmKDsIE5QJH4aftP9TAZGDCCG9koQyQchB2GU6WQhZ5JVU4lHxAAZvvlEmBhMzOeqbvHfycYDIorzu9H935fExXO9pAIsisbjuPXj5/i6ADMG1kRnEkmtgKyDLYMugNGfxwaoikCNYUtSHgjgaDuL+83elABBwLo3e3ZPYyJn1JTuwL/0PLiwL4UKiESUFBrMLyzhQE4SzDlkCcRZsU/6gyw4K2YyR5OCsgyPBl8Q6Upa3CKzdBJNFbnF5xnHynRfyL8BQcji29hru9lWEk3HY0gq0ppsAnIM5c/yIqgpEBKoC9buoZrAqmosFnfWVqGvrQl64HqlPEUxNjGLl29dLOS9GP5qppPse3N+MqsOtiC2aVKihEyW1TZheyh0bjsZNI8/NHGrrQn58HOZZDwpnXmFfbRnUaH/Av9LZaDQ6ACAFYCgSiVz0330A4IkJ51eEgROXtz7QjUp4YmrNdsIUaQ/MtXSfryn6MYJ0agEbANZWPcTimN9WmApLy4c+v52gn5sFWPV2YXnJYHresAIPzXbjHO3ee+XXUrLXYxNiT+cVGOyI0J3frMiI4RHtXVwAAAAASUVORK5CYII=",
  "title": "Bully",
  "author": "Viki McKendry",
  "numberOfPages": 606,
  "publishDate": "12/4/1996",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMESURBVDjLXZNrSFNxGMYPgQQRfYv6EgR9kCgKohtFgRAVQUHQh24GQReqhViWlVYbZJlZmZmombfVpJXTdHa3reM8uszmWpqnmQuX5drmLsdjenR7ev9DR3Xgd3h43+d5/pw/HA4AN9zITSPUhJ14R0xn87+h2ZzJvZVInJpzAQOXQOQMt+/5rvhMCLXv9Vjrt1rSXitmwj+Jua1+Ox+2HfGNdGf6yW8l5sUKPNVcRsiaPDA22Ahv6/7Ae/0aKdviQ0G7B/c6f8Zg+gbfh079Mjno0MhS58lflOsgEjh3BXc+bM/0DzbvDwj314znt/bjof0HdPw3FBq6kP+oCxVNfdDZvqPsrQmf6zdFRtyPJgbrFoqUTeS+FnPrekpmiC2lS+QcUx+qrf0wmFzodYfgC0nwhoYh9oegfdmLsmYXHj7JhV23erS7ZNYHyibGLiLtXsO19BoHSiwu6Ok09gwFg/gy8BO/STOkKFBk7EWh2YkLeh5Hy4Ws2B2w157iDvOpxw4UPRPRTSfL41FIsow7ZeXwUFF4dBQ1L96A/xLEFf1HMC/LxAt25PH+VN0HXH1gh2dEwdBoBGO0OKvW4L7hCdIvavBSsMIRVHCi0ArmZZl4wbYrz/yHSq1Ql9vQLylUEoE7GMal3OuxMG/7CO848N6n4HheK5iXZeIFmy88Nu+8aYJG24G3ziB+0Ee7wwqemlvQ5w9hcAJwyUDtpwBOFLeBeVkmXpB0qlK9RV2HlLsCsvUivHRhQwoQjhCkA1TgJX1OK0JVzIN5WSZesPZ44XKia+P5BqSS4aq+BzZXABLdhyQrsJPOqv4MVcEbMA/zsky8gLHyYO7hI9laecOZWuzLfYXU2zzSblmQerMZqjwTknOeY9dlIw5kVcrMG/8XpoQgCEkOhwNNJn5i7bFSrFDpsCrFEIPpLacr0WxpibYIQpS86/8pMBqNswnJ6XSivqHBv3R3pmbxzgwz4Z+EaTXtwqIogrzjxIJ4QVVV1UyihxgjFv3/K09Bu/lEkBgg5rLZH+fT5dvfn7iFAAAAAElFTkSuQmCC",
  "title": "Lovers on the Bridge, The (Amants du Pont-Neuf, Les)",
  "author": "Harriett Autin",
  "numberOfPages": 99,
  "publishDate": "3/30/2009",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLfZNLSFRRGIC/O3Pn1cyUlLXIlB6SQrXo/YSiRSQDualVUFZE1KJtrTKHIloEbQpqYUW4DipSehBIYWr00MIs0ckUR6Z8jqNz7/nPaTEqI2E/HM6D833n5/znWMYYZuLglUZz4lApTT+H0MogohHRaNEopdmzZgm36z7w/vZha4axyQstgtYG5U6DKteLyjWlDKIkH8GTP5k9zRWUI6xzP3PKuYvrCK4rOeH/BFoJExmX5dEAriMcMK/YER6gaKqb4kUh0pksIv/NQOKt7YMUBmzWRydYa36gl+8mZjWxLOyn+WMfWkl8XkHj9YrqL99T8ea2JLtohTWVSOFWNjlNtHz6SXtnMt5RV1Wdz1jGGHi4O4THW4bBC3ChM3bm/Op3pws3H0dcm8CvRzz8oJ9UlSZqyG0BNZXi5JvenODBtj4WlxcZLDAGjEaW7SRrr0Cnf+NVIwQyP7CmhnJJiwvpATxjw8dygmvFh1CmTu87G5HSI+ixFGrsN3o8hc6MYJwsGI3lX4AXhd3+lGBP12PCvqPW7EO6VFSK5qneXlmWLalEhpNIZhidGcVMjGEsQ0ANEfn4Ukirau4lr869xHh/FxHfFs+3hkf2yFeMdjBTE5hsBq0msX02kY7XQzimYgb+pwpcTKQpWPjCM57AKBeUC1rAne79dpo7/S/mLSMA3mBMCspzQ58i6B3FEypAdABZvLSEmvIN8wtqd4Qw1n6JrCTYXU/0eW3Xgrf196OpZgLecdTCVSBWbH6B6L0SXhHyPbuMv6XlLsps5FbfCd9Ab0X407N+MzkJrpkjmPMbGR0p8n5P9vDHOUftYMPs+o1EAxfL1gU7224ibMtH/gIKIWcO8vV/HwAAAABJRU5ErkJggg==",
  "title": "Frostbitten (Frostbiten)",
  "author": "Sal Shulem",
  "numberOfPages": 791,
  "publishDate": "9/29/2005",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ5SURBVDjLpZPNS1RhFMaff2EWLWo5tGnRaqCFRBAM0cZFwVSQpVHNQAWVMQwaSSZWtimLiKnsO5lEjKzs4y1zRK3oItfMj1FnnJkaUtNrjo45H3eejpCKNa5anMX73vs855zfOS9I4n9i2SHbCpvph8q8A9PNcCzcz76EM9EETj+DmmqENaeBiJ3mRyuzQy5mwyVMKqiFbzNN0MxgKZOd2zj5GMZE/ZL5ooHZAntGW89s7Bw5Ws25llWcfQHrzHPYE/51ZOQ0M4Fiitj4UQdbzhZSb+FJ63ZypJqp7p0UsTf+FN6kvoMMl3GmNY9jj+BckcF8/HoFldLzpZIqxhthJPVdkr2cifdb5sXefyAKLFvyzVJJAssisIxstILZ0DEyeJzpHifHfNBGamFZ+C9yC7bhG7BBxCrZZqWQpoiNP6S1TMBFDh4gA0VMdxfy+0NosftQX+8gGKkBY741HLoGhbnXUOZwKTn+gGa4nOlBN9MDxdJzCTmwj+wvEKPDTPUc5Zx+kOk+NxmqZOJTIXsviYGQVgKLAos/n0CbbIAS0ir1eY9kF4O+3UzpBYzehhaugQpdR3DwKth7EeyqEoO/oYzXwyKwDDN0ipme/VKFi0l9L8M3oYW8SwxWnIKI1XT7Vqb6i/ntLoLTHdulhROcUJsZuJJjCsvEPpyf8m8io5U0VB6FtFNIe6da84XFEcYaNrDzLDw5DUZ9cEwqm6zxGWYGPBTShogtQtoerV0rLA5JKy5+ubya7SdzbKKMyRG7ByPeIfvebKfAWszUdQFavKOI0bqNbCuF4XfneAvzIaStQrpOxEpIL746rQKOD2VQbSXwtLiXg/wNTNvAOhsl8oEAAAAASUVORK5CYII=",
  "title": "Nelly & Monsieur Arnaud",
  "author": "Frederique Gowers",
  "numberOfPages": 617,
  "publishDate": "3/18/1992",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFiSURBVBgZpcEhbpRRGIXh99x7IU0asGBJWEIdCLaAqcFiCArFCkjA0KRJF0EF26kkFbVVdEj6/985zJ0wBjfp8ygJD6G3n358fP3m5NvtJscJYBObchEHx6QKJ6SKsnn6eLm7urr5/PP76cU4eXVy/ujouD074hDHd5s6By7GZknb3P7mUH+WNLZGKnx595JDvf96zTQSM92vRYA4lMEEO5RNraHWUDH3FV48f0K5mAYJk5pQQpqIgixaE1JDKtRDd2OsYfJaTKNcTA2IBIIesMAOPdDUGYJSqGYml5lGHHYkSGhAJBBIkAoWREAT3Z3JLqZhF3uS2EloQCQ8xLBxoAEWO7aZxros7EgISIIkwlZCY6s1OlAJTWFal5VppMzUgbAlQcIkiT0DXSI2U2ymYZs9AWJL4n+df3pncsI0bn5dX344W05dhctUFbapZcE2ToiLVHBMbGymS7aUhIdoPNBf7Jjw/gQ77u4AAAAASUVORK5CYII=",
  "title": "Trick 'r Treat",
  "author": "Jenni Gallard",
  "numberOfPages": 113,
  "publishDate": "5/23/2017",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH2SURBVDjLldPLSxtRFAbwm7ooUheuSn2iQqHtLkZTFGsXShA3LYUi2FJR8VWhuhC6iFAfiEZRE0jUUNDGNKVVxIJUSnGj4APFQhf9D0pCXs1z8tav9wyJjI9ovfAxA3PPb+4Z5jAAjK98HgWP8ooU8dygmlRYElBEIhFvPB4/SiQSuCj8OfR6ve4skgKUVBwMBiEIwkl8Ph88Hg/sdruI2Gw2GAyGUwgtGQG0IRwOIxqNildKIBCA1+uFw+EQgVAoBHqJ0WgUkXMAFadCABX4/X44nc5zLSW/iewUwNs42UD31HeqFZfLJZ7EarWmB85GitBJ6Hu43e7/B6RI76dqtC3I4fY4rwdQYrEYuswVGFxrRMPcPYQiwauBHssjvPlYgc7FcrTMy9G/+hxLBzr0LT+BSpuDrLyMx5cC3eaH+PpzBiuHerHw84EW2o0+mHbH0WlRoXz05tEDtSw7LdDK+6XiqR890Hzvxsh6OwbWmjH0rQNzW8N4+aEKd9+xRFrgxfv7+LKvhWVvEqadccxvj3HkNWa3htBuqUORmv3NfcvkUuBYCjybLUG9Lh+107dRNZGNVwuVmNkcQItZhTLNHWRVsgbpLJTxv0/ghWmHSTF2C02mGig1efj955dAAygFCgi5bJSL+1m4UJ2BzFL2NDn6BVT7D+X3feV2c5mYAAAAAElFTkSuQmCC",
  "title": "Blood of a Poet, The (Sang d'un poète, Le)",
  "author": "Norton Lehr",
  "numberOfPages": 566,
  "publishDate": "2/12/1997",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZO/a5NRFIaf+yWmNU1iolQsSqRiBZXiT1ocpC5FURwUdXHSTcdCF6t/QcFdHBREBBVFUCkIFV1KK+LgorYaqtCa9rOpaUzy5d57joMQi4qDnvFweDjnvO9rVJX/qfivDffUpFQZUOGQCD2qoMKECCMqXE4f1cryebN8A/fU9KlwzeQHO022B02sBvVoLcSXXhFNDhdEOJM7ps9+A7hRc0yzffeCdafR5Cp89Q0SfUFdHUwrQetmjA2IPt4hKj473n5K7zcBdtSsVmU61n0rJUEZXy+AXUJchPr6D4gopiVPrKWbr2NnKyJs7DitCwGACgPBxqGUJkCiArhvjD4IQRrgGzx/AmIruPJrfPSe5NahlHgGAAIAEY6YXC9SL6CuhorlwOGVqFjUW/b3VVCJUFvBLb4knt2CeI40VRBhGy0ZpLaIiqW65Jn/nGBxoQ1Fyaa/kksXaQkaqAuBCO/pbAJUqKmrJ/AOfIPiTJzUhhPk93UDEE6/Jpy6yvpcESUAVUSI/TzBU8DWgAQqloUvK+jo6iWZWUsys5aOrl5KS2tQaWCCJOLj2Iip5T94ZMNXmEQeFcjlqsxOjlMtz1EtzzE7OU42WQQNiGd2UAunsQ0eNWUs3TPtInxI9d5IiX1LJZwinIuxWE6DCpnkPLnkDG3ZDkzmINMPz1WcZdOuCzrfNNL8bXMi3t5/pzV/HGJLuNILfG0GdXVMPE0svRPPJkpvHlN6N3Jy95De/c3KszdNv3iutG0b7Eys2U6wIgBxuMjzbfYdn8eGC85yfs9FHfljFgA+XTcp8QyKcMh7elwDnGXCWUacZXjvpb+E6V/qO6evcx8oUQKYAAAAAElFTkSuQmCC",
  "title": "The Questor Tapes",
  "author": "Padraic Vreiberg",
  "numberOfPages": 251,
  "publishDate": "6/20/2014",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALASURBVDjLjZNJTFNRGIW7ZOFON2xMiBtDHOJKgom6dYgsWKCJTRgUIkSCYYOiiURiq1ZKsEUmAYMUEgm0MrWFIHagiEALhYJCKW2lpZOU9nUejve9CIJTvMn3huSe7/15N4e11HYnhVBK6CcYCRQhMdd4C5O11zH2+Eqiv/Ic1V120thamNYvZB8q5eccSAHAomGRzar1YQ5sE0I4ta/g1r+Ga64dm1PN2FDUwyLnwyjhYKHjLlS1eeitOAsiUO0KDB335nYEjplmQgvsmkZ8/SDEurQGRvETLHVVQdtcDgWPzQhq2alzuwL1vDl9Rj2O1eEmLIoeYEpYgDFOFsjYIGOjregIGgoOo6nkGLoeZaNJwIWgczh9V0Bfxlai0hlrBG5/DKFoEuFYEp5AHIu2EKbNQZjcERhdEQzMuiAYMkl3wrsCGpkh2CczBJLrZDMVTsDmjWHJHsYaCaq/+PBSZkm+GDT17g3vE9CItdsZEq3X+NHoh+VblAkP6Tyol5lX6gbXMn4N/ybYQTThVM6aKUyb/BBKzYo/7fmnoHvCodFZKcwQQd3AmvK/BSK1I1P8yWmet/jhoeKwb8cwOO0At2d5tbyhrLFUcNVXWJOFa9XnfRcqTtzfJ+hQbop7Jh3JNWeIOYlIPAlfKAGLJwp+Xyuq3uZhYEEInU0O/kgxcvjHcboklceE2xV22Yjegw1vFIFIAlESjieSoMiz1hpE3tOLkOhrITHUgV680ZvgjxbRghCra0Sf3qm0YdywBacvxoRJlhF4g3F83gzjcuUpDC20YO96Ny+kBWC6sCBrgEqjhmbZDasriO0AOUK7H6L3Jjx8o8OZ22l4Js8HR57LhDmy3J8T7C3T37pQzb2EbN5RPJffYL5M3+l35h/srTOpsJFUmPpRYaYLpMIJUmGKnX9wK7M4NUaPTfARuPT/+w5sF/jkpVJK3QAAAABJRU5ErkJggg==",
  "title": "Ice Station Zebra",
  "author": "Cahra Randleson",
  "numberOfPages": 327,
  "publishDate": "12/9/1993",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJhSURBVDjLdZPda85hGMc/v+f5Pc8e2wE2QtiMyZh5K4RSpCkHxJnkSElOxJFy4kDyF3DopR15yUst2pRpJw4cSJLETCTb0mxre57f775eHPyevdBcdXfV3X19ru/36rojd+fwuZtt7n7PYQRnt+O4A+5kyaePaSAko19e3rm0GiAme3DaobV9Q2M0NDyK+1QRZDDDDX6PTlBOHPO4mWpkANjbvmFltG/TShqXteMZAXPLulrWffGCWmpLMXuOnOEvAO4L29uaePr6EyMjk7gZADalwh035/fYJJUkZXZULRDFxZi1G5toWVKPKrgbZo6qo2aIOeVK4O793rkAjqrxdWiMYq5ApVIhJCli2b2QJy4UWVRXg7nPAQBMDdFAkiQc3dGSyc/U4e7cevGBUCrwT/2MgqCGBkE0R2fve5IgiDoqhhBRKBZJJRvqnAARIw2B1MBzNUSFAuQciwwzI9WIVP8LgCCKVIQkKKJGUKvmDL5+4BFrPj5g29AAv4olujviix3dcm1GgRohCSRBMzvqpFVIa/9jdiV9tJ48Q01zG+W33bzv67nSc6AwkZttIaQZIBWjHJQ0KIkYy991sm7fMUqfe4luH6e2/yGrmhryHvn5eGphUlEkEZJgBDNUnGBKCM788UFKS5vh0IUZ75eXkbdo1fQMVB1NNbNghogh4og4Y7UNTL7pou7JWZLyTyaB8bE8mufH9AzI5di+cxMeRag6oo5V8+iWE7x71UVj/TzifIHxYWFgMFLHr08Bep51vTqV/bxZ+4+Dw3NfwX7byuZvPTSkYPncd8dvHOyWq38AFgvYQWlFsCQAAAAASUVORK5CYII=",
  "title": "State of Emergency",
  "author": "Jeramey Baldree",
  "numberOfPages": 257,
  "publishDate": "8/20/1990",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGvSURBVDjLpZO7alZREEbXiSdqJJDKYJNCkPBXYq12prHwBezSCpaidnY+graCYO0DpLRTQcR3EFLl8p+9525xgkRIJJApB2bN+gZmqCouU+NZzVef9isyUYeIRD0RTz482xouBBBNHi5u4JlkgUfx+evhxQ2aJRrJ/oFjUWysXeG45cUBy+aoJ90Sj0LGFY6anw2o1y/mK2ZS5pQ50+2XiBbdCvPk+mpw2OM/Bo92IJMhgiGCox+JeNEksIC11eLwvAhlzuAO37+BG9y9x3FTuiWTzhH61QFvdg5AdAZIB3Mw50AKsaRJYlGsX0tymTzf2y1TR9WwbogYY3ZhxR26gBmocrxMuhZNE435FtmSx1tP8QgiHEvj45d3jNlONouAKrjjzWaDv4CkmmNu/Pz9CzVh++Yd2rIz5tTnwdZmAzNymXT9F5AtMFeaTogJYkJfdsaaGpyO4E62pJ0yUCtKQFxo0hAT1JU2CWNOJ5vvP4AIcKeao17c2ljFE8SKEkVdWWxu42GYK9KE4c3O20pzSpyyoCx4v/6ECkCTCqccKorNxR5uSXgQnmQkw2Xf+Q+0iqQ9Ap64TwAAAABJRU5ErkJggg==",
  "title": "Trainer on the Beach 2",
  "author": "Puff Boteman",
  "numberOfPages": 482,
  "publishDate": "8/10/2004",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVDjLpZPNS1RhFMZ/5733zkzjR/ZBCUpoJdUiBCkll4m0CUKJIGpVSLjyL2gntDFop6shAolWbcSNIW0ircHBUHCloo3VjNY0jjP3831bWA5ai8Bnfc7vPOfhHDHGcBjZAENji7N1cSj7IcdqY2zkKoiC2qSFNsKPYoXpTPbBynj/4j8BlbLL9c4L3OqoZWLmM4/vXdpX9OJtHq0lBXQdBIgxhvtPZmZ7ui+yspZrjwKfWExxtMbh66YLAgj4geZnyd2YzmT7Vsb75/c5UEqwDLgVl55r57hxuYY3c18Y6mtDgO1KSBBETMwV0VpeA2f3ARKOwvUCcgWX9bzH0NhqvC4Okx9zBzNpPdGQ4OHIrJnOZLtWxvs/2AChNnhRiFIKy8j/ZjILiALYLgc4YnO8zsJSIWUv4Pt2CMBU+tteoxtC0YN8wUdEV1eItMHCIdSagru5l0kQaZ4OdqC1wQAWhqQNnudR3PGrANu2aGmE9FJATSxJwinhegHDr1ZRAmGk0ZHGAMYYMJB0dh0ogOVs6VNqcoGtosYv1+9lYikHERvBQsQCozBGCMIQ3w+rDtKjvQMAd4bfL59vFqYzQasjNoM36wi1vzvHgBFNwo4x8nKNreJOFfBHy9nSXGpyoSPSYOGgqZCae8TJ5BkERb68zsDVZygSlD3/b0B6tPf2byempRFO127T095JQ6wJFBTcJk7VhCRjYItUT/mgrgxOvWtrPtLdEG8gYdcT6gDRGjERWsosrS2TKwbMP78rcth3/gX/0SEvLZFG1QAAAABJRU5ErkJggg==",
  "title": "Kenny Begins",
  "author": "Kerstin Rosenkrantz",
  "numberOfPages": 590,
  "publishDate": "7/6/2004",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEUSURBVCjPXdFNSsMAEIbh0Su4teAdIgEvJB5C14K4UexCEFQEKfivtKIIIlYQdKPiDUTRKtb0x6ZJ+volraEJ3+zmycwkMczGzTE3lwkbxeLE5XTqQfTIjhIm6bCy9E/icoOoyR4v7PLDN+8ibxQHxGzE3JBfHrgUalDnQ6BNk1WRFPjs66kDNTxqg0Uh5qYg4IkrjrS9pTWfmvKaBaGaNU4EY+Lpkq88eKZKmTAhbd3i5UFZg0+TzV1d1FZy4FCpJCAQ8DUnA86ZpciiXjbQhK7aObDOGnNsUkra/WRAiQXdvSwWpBkGvQpnbHHMRvqRlCgBqkm/dd2745YbtofafsOcPiiMTc1fzNzHma4O/XLHCtgfTLBbxm6KrMIAAAAASUVORK5CYII=",
  "title": "Legend",
  "author": "Fredi Sivewright",
  "numberOfPages": 358,
  "publishDate": "2/16/2006",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALeSURBVDjLY/j//z8DDKvNusuTturRzro9L95NO/b674RDr37W73z+Pmnxg9PypRcUkNXCMIaAcu9Nj7rjb24ee/rt/9HH3/47zry7Si7/vKZM5hlGggYodd5g1J9wc+KiKx8+Wk+5vSh367OLlp3XF8kknxbGphnDAIWGK4kbb37+pV13pV82+6xF1Y7nt90m3NwinX3JWrP51hzz3nsHTTrv7jZpvbPbrPXWQc3Sa8sQmqsuq5bsfHF15ul3b2TSzphJx5/UmXLw9Wv/KbcPSGdecFauuDnZZ97jz9kbX/zPXPPiv07pjXXisRfK4AYYtVydufn6pz/zTr77MOHAqxczDr5+e+Dmp/+xs+6eEfM6IKffcGt9wLxH/5x6795NXPbkv0T0+Wax8LNsDMAAYgEGUOySM+8++027s1cy9GikRODhYHG/g3lT97x4mzL77mXJhLMZMUue/rdtu3sZaKt7xNzH/2WizveCwwAYQHrZax5fmnTg1SuJoCOGMBeJeu5VT5px52LGrHsP3Cbff+824d5Lsajz1kBbgyJnPvyvmnhhGdiAjp3Pv087+Op/89ZnX5Jn3N4GEhRx32Mc3HPj5LJDb/5HT7r3P3HJk/9iEWdrwXIhp73Dp97/r518YQvWdICMgc6NiZ7/+H/yoif/U2fM/58zJf5/Wp///6hWj/82ucU3BL2OCOPWHH3ezLr+5mWv3rvffKvrTzeuTvy/5crU/xee7frfvzvrf3i/7n/jdJ15OA3QzL60JmHeo/9iwSebY9tdvm+8POH/xmuT/oNAz57U//170v+bZ0v9wNAIDCRj0dAzxe5tdz54tN35Kux3Itin2vD/titz/iODTZemAg2QxLTZvfPuJ9++u/99e+789+m4898o7eIxyxzp7927kv6370oAa27fmQB2gUW2/H+8gQjDQJtagns0/vfuSgHbDKJBfKB4D1EGQA3pAOJPIGdD6Q6QOADllJVJzH+HzQAAAABJRU5ErkJggg==",
  "title": "Professional Gun, A (Mercenary, The) (Mercenario, Il)",
  "author": "Bradan Anderson",
  "numberOfPages": 68,
  "publishDate": "8/20/1990",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAL5SURBVDjLjZNbSJNhGMd3KdRlN90E1Z0URVfShYKKic7ChFRKyHRNp3lAgq1ppeam5nFuno+JJ8ylzNMSRec3LdFNm7rKPuemznm2nMfl/n3fBw6tiC5+Lw8Pz//H8148LH1VvBNFDIWCgqSwUhxNlETiQ94D9IluHymEbtbGuGtk5eOLClnIuZjcwLNOAFg0LGqYmOsSwzwkw4q2Amu6GqxOVMMyUoZFVSFM73NBtokxWSsAkRcKOd8VlIBwCKZrn00cC5bHyijKsTRcgoUBGea6c0C2ZkDfkAxtWQJUWSGMIC/k/IRDoP5kdB5T9+NbVymm6pMwIgtDn/gOqLVBrY0q7mUUh11AadQVNKQGoFSaDmldl7NDQD99M4fdY/MHWNu2Ye/Qjn2bHes7PzFl3sOocReGtQOQqwdo16xC2mnoPg47BDTK6d13yukd+xw1bN0/gnnLBv3SPmapoPrrDxQpTfaCDoP8ZPiUgKZV+92lTbtFfiS3Ydo4ZMKd4+soVBpnJB2zLr+H/xAcUz+0MqgxWjFq2Ias26j628w/BY1Dy8Pj81aMUQJJ++zgfwvq1cs3mwmT6U1zO7KyslFZWYnUtAwkl/ctCKUK38TERJLupaWlbfB4vKeurq5nHOHaQUtrE7Foz5WWIj8/HxaLBSRJYmBgAOmvc5H4Kg/6z1+O6B5BEMwMm83OZMLVqiVlj24d8s5eCIVCaHQ6iMXp8PPzA4fDgUQigUAgYGpfNtseFBTUSUsSEhK2WA09Oue6QTP6pzchysyBSCRiBDu7e7jl7Y3e3l5oNBqoVCq0tLTA3dMLvCTZDVqQkpKyx9zCpLIYxLAa6ZIKxMbGMQK+8Dk8PDzh5eUFf39/Brr2cHfHwwD3TVrA5XI3Tx3TiCIDnNBgFOTnQP62CXK5HEVFRYiPjwefz2dqutdUV2PLzs7epL6oZ508Z21xBNny8t5u8F1fcDmP8CQqEtEUSfev7r8IvGSO5kXYoqJ4h+Hh4VYfHx+Dm5vb9V9HN9N1j9T0nAAAAABJRU5ErkJggg==",
  "title": "Thirteen Days",
  "author": "Lauren Covely",
  "numberOfPages": 423,
  "publishDate": "2/9/2008",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMFSURBVDjLXZNbaFxVFIa/c84kPZM4M0lNE2svw1g1KG1NEKt9kAYLZbRKlBrQvhYbURG0L1V8MQYUES/QIhrQJwXvtAbxJQVHYiC9DYWCTpVOgkwzzSSTuZ199jln7+1DQDr5YL2t9a/FWuu3jDG0kZsaBI6j1AEcPUQYggrz6OA3hPycZ97+69Z0q00gN/U6Sk3S3RvHjQM2GAWtBoR1qBQFOnyLsY8+bBfITXVizBnc7iydLtSXwauBpUD6oANwNkGiB2oVqCz8ShSM8uK3gQ2AUu8T784CsHxdIVYP4ntdZN+0GJ2wEM0uajcOUswrlAI3mUW23l2f4NzpPVjqMvE+h+qCQspdmHAFFZxEh48RSNDyHJ54Dyu8nUD+w8A9DsWLCh3ujaH8Y8R7HbybIL1DmCAiCq/Q1ZuhsQK2BbHUfrzVo0j5KFIeonxths07HJauHrOJ/Cx2J9RuQiTm8Jof46YylK99R31phNXSSD1anCulk5lIy08xYo5qCdwEeF7WxvcyYCD0wG8FKHGYtRsQeqcvDJ9Ind/7vFjp67jTvfsp1lIdj+O1AmQLrBgQbrOJxPqWZQtEvROvFae1tExqm5JS/mCL4h+J9JPp5NZhqgk39vfg9v2YaP1CtnFsRGOR8p8gGgLZUviNA4z/1D+7fWz8oU3/xpLyspPo60HVz9I3fBypzUnj6BKL8wCLMbzmKURVEMhveOVsAORmZ2c3+754Ol+eZ9fuZ8G/xPxXZ3jkhTcIZfBEfmd6bHihWAH6Y4x//Qkb8H1/kkahq78nTqLXQ9Wvg9Go5nkyIyeswi+T78xvGXh436tzDXtj8czMzJAvmuO31X63e3YOob0rGC148MggOijhugUG9jx3XySD11h/9naEEB90rF1QW+/aR1eigolWwHK4+GMB0Gi/wJZ70ygZvpyb2H1/m5mmp6cPCyE+27F0KvHA0S+Tjl3ERFXgVsfaOPFBylfzFH6e+D62ofuo7/svab/5xaWpI8Jog9H6/9Aax2gNWiu0xhhzx3/je6YQnMUxcAAAAABJRU5ErkJggg==",
  "title": "Between Strangers",
  "author": "Gilles Haston",
  "numberOfPages": 608,
  "publishDate": "12/9/2010",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIWSURBVDjLhZNPbxJRFMWhRrYu3NrExIUbdzWte6M7d34Eo2Hjxm8gwZUxIYEARUKAWgwbV0BpxAW11bpQFrCoCVEMDplhQMow782/enx3WsiU0jrJ2bz7zu+9e95cHwAfSXzXhFaEVv+j60JLM58HsGIYxsi27SPHcbBIoo5oNBrxQryAVTJPJhPouu6q0+mgVquh0WhAlmUX0uv1EIvFZpCp2U8A2sA5h2maYIyhUChA0zTU63UoiuICaJ0OSSaTx5B5AJnpqqVSCbmNTWxVt9FsNtHv98+05GYyD7AsC5VKBZvFd/j2k6Etc6gjHfLgELKiujeRJGkxQGSAYDCIx8+eI/ORIb3Lkf0sWvmio9aaoC2NoQ7+QFUHCwFr5XIZ8bfvhZFhq2XgU9tEb2Tj99DCgcTx9YeOg64GZTCGPQdYEnpaLBbxZl9HfIejo1rg5nGvti3CMyxouonhIYM8ZG7NBWSz2YepVKobiUR+UXjrwry+wzBm9qnAqD03YHohbsASUP+ly2u+XC7XzmQyt9LpdJc2xuscr0ULU9NUFC6JDiFRCy4gn88/EWqFw+EEmfL7HK8+8FOAqdmrWYjC7E8kElcCgcAdWmx2LbzY5mCmc+YWXp33H/w1LQehKhPPZuK8mTjR0QxwArktQtKpsLHHEarwC81ir+ZOrwewTBCiXr157/7d0PfqjQcvH10w1jT6y/8A/nHJHcAgm2AAAAAASUVORK5CYII=",
  "title": "They Call Him Bulldozer (Lo chiamavano Bulldozer)",
  "author": "Fulvia Cornbell",
  "numberOfPages": 670,
  "publishDate": "4/6/2008",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEYSURBVBgZBcHPio5hGAfg6/2+R980k6wmJgsJ5U/ZOAqbSc2GnXOwUg7BESgLUeIQ1GSjLFnMwsKGGg1qxJRmPM97/1zXFAAAAEADdlfZzr26miup2svnelq7d2aYgt3rebl585wN6+K3I1/9fJe7O/uIePP2SypJkiRJ0vMhr55FLCA3zgIAOK9uQ4MS361ZOSX+OrTvkgINSjS/HIvhjxNNFGgQsbSmabohKDNoUGLohsls6BaiQIMSs2FYmnXdUsygQYmumy3Nhi6igwalDEOJEjPKP7CA2aFNK8Bkyy3fdNCg7r9/fW3jgpVJbDmy5+PB2IYp4MXFelQ7izPrhkPHB+P5/PjhD5gCgCenx+VR/dODEwD+A3T7nqbxwf1HAAAAAElFTkSuQmCC",
  "title": "Come On, Rangers",
  "author": "Klemens Gabbetis",
  "numberOfPages": 76,
  "publishDate": "10/26/2002",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJJSURBVDjLpVM9ixNRFD1vvhLzxUiMCitiCjFWwrJuYaGQICgIgl2wSCWSIr9AFAsbQcVfYGEj9kICizGFgoUIIUENBDFrkLiDukw22fke7501MetHtY+58x6Pd+455973RBiG2MuQsMehzBa9Xu+57/tFCnieB9d15+E4zjxs2+a5WalUSowTbIHA5zRNa+VyuejQn2PRpqqqaLVaGAwGpVqt1owUEOMtXdcxGo0Qi8XmoEUgr4fDITKZDPL5PJPeoO2m6HQ6EXs2m4VpmrvkshUGCiEgy3LEnk6nkUwm0Wg00O/3Swqzs3T2yofi8XgUD+pbSJOYqeNhf0rDl41tCMlHKjFGEG7hh1mAZw7vKsw0mUxgGEZUIGYMggDb0wyKqydweTmFZ6+HuHn15K66PG4ZeBGcX5EoQZE3OBF3oN1uo9vtYmq7+D72osNrb77OgRZtmTZgbDpkLYDCrOyVgxNwsGdJIt9UQ9cPcL+6TKqoqJRApn+CSs84c+LsJJgBWXqhUIjmdz0JFqm48/QTKBc8ShRQhLO20pdQfyngDnCCWes4vPc2bN+DLKkMgcCOspCVhAEp5gvmQbEsq1Gv1y8s3LJoHrtnoQoF1UtpeIGzc+uZmHzHFQ33nqzjmzmBUi6XL/7rjl+5/TKkzoP6gUdvr+NA4iipkGBMP+Pa6Ye0ilOhnd9v4a9Hosg4dhg4lBqjdGoVurYUidi0lnAw6SGh0RmyJP73nFeqa6+OH9l3Ro/pJDlDNlwIKq4Iqdhiig/rH7FhuvgJMpVtkQoe5WAAAAAASUVORK5CYII=",
  "title": "Countess from Hong Kong, A",
  "author": "Ives Ebourne",
  "numberOfPages": 755,
  "publishDate": "10/16/2017",
  "haveRead": true}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVDjLpZO/SmNREMZ/uVxFCGy7L+AjpAgoIUW4hZjCCDZCbCQgVlY+gaDNLghibbmy2EgQTCOp8gaWYmFrpbE4Z+azuPe6UVE2ZGBgzoHz/Zk5U5HELFFZ2/uzu9ysHT2OVZUAd+SOuSEXLkdmuITMMHd+zIfn29uH/YtfGydpbal2PLdQTX4uTEVcfR7bMXCSjoOS8ePT1NJfghKAVCYONhenBtg+vCcHkAOwcwOnTRiNRkjCzHD3TwmQZRnmlgNQTOG0mSPX6/V3TJNTmqw9FgAl0tY1nGUwHA4xM2KMbyom1Uii0+ng5oUFz1HPshy50Wh8yTp59tJCWaxfwt9VMRgMiDG+y48Kut3uWz/SGAKQP5ZEq9X6lrmMGGJhofCyclGhvyb6/T4hBEIIxBgJIXyaQq/XQ6WC8vJqHSCh3W7/1z/wQlH6cHd/vvM7bLgZbv86biWzhNyQFXvhTsF5DlCZdRsTZoxXOgYqlSAcLRcAAAAASUVORK5CYII=",
  "title": "Gone Girl",
  "author": "Pancho Hearon",
  "numberOfPages": 379,
  "publishDate": "8/7/2001",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHXSURBVBgZpcE/S5VhGMfx7+8+T2VI0SDVKvYSrKE/0FsIwgZpCFqiISSiIcoigkIosWyrOR16AU2NETSGZUQoiNYgBJ1znufcz3VdeUvOIX4+igj2QhemFq6fPT/+ZLMXwxGAO+GOuREeeDhhhkcQZpg7h/fn7tLS2u23Tyfmq/Ez43P7hobTsSF2Y7jbszlgvurlSL3NP+xWP0diSxUWPJo8wW5dfbxCUUU4xaA1AggPzMEJ3ANzx9rA2sDCGVgwevwQ5kZREUGhJBRBJBEK5CIlISUkQ52g44mqDQpvjaIyN4oEhASCToAL3INOQFKHSmAKLDmFm1NU4cE2CSJIQEggkCAscMHsp4d4G9w4eY/C3SiSu7FDEkgUCUgSqhIzH+7SH3TpNr+ZfjdF4e4Uqc2ZbRKSKCSBhHnL/fc3yblhbGSM0aNj1LnLlVeT5NxQpDCn6AACJCFAwPOPM/zcXKeuG+p2QN02HNh/kNWNFX6lBYrk7uwQkIAk0ZG4dfoOry++YXn1G02uaXLN8vdlZi+/ZCRfoqjWfqwsXnuWJ9wMN8fMcHcsZ9wdj6B/pKbfNmTLbKxvMD37hS2LbFFE8D/nHpyKpsnkOjMYZD6/+Cr+UUSwF38B/pkb32XiUiUAAAAASUVORK5CYII=",
  "title": "Descent: Part 2, The",
  "author": "Candi Coutthart",
  "numberOfPages": 639,
  "publishDate": "1/18/2002",
  "haveRead": false}, {
  "coverImage":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKtSURBVDjLlZJvaNV1FMY/vz/3zrt77xjs7s7mVZNS3HAuFIWwXpRWexEYDANFKQpfyagE8Q8iUfinKHwTFL0wzBcWMWjpCxWJJQ6hHGOSNtzcTYmma7ipu97tfs85X1+s1DcmHnjgcB54zsNzTnDkzPge79ms3gpmhhqIGaqGmkfUHoKi4lGz3/ZuXLgSIDbvO9pXZnM8QX34/dDS//pYzXIAXcOHERNEBWeCU4czoTFTIFedpy6V48TVn9jSsgvntOohAQ/AhuZ3H7v5+JVOvuz7BCdreSCgBsDRs6P3hw21SZLZv+gdP0Hx1gAiijhlTrpASe5wu/pb4DMAQvlXAGD9C3miwDN/3ii/jneRiVKsbmxjzdw2Xl3QxuJcE00Nzcyum2btV68NAcRODfOeOILOc6NEUcjp4R6qqaa+Kk//jT6Gx67gKo5CzVxEhMGi0tVx8lmAUNXwQBwFtD+fJw7h77uX6L/Rx7HLP1KZCjn0xnccebOTcmkaK0ckJzfx8oFVqfsOvEEcwvHef4giePvpj8jMiggCuHmnwtDIXUSNFDk+eGUnW4b6+HlHTxkgdGJ470lE8PryembFAQvyKeprkuSySeqySX648DmLCxn2t39MGISkq+IHVxCbCTEKA073jwEwOFIim4JEmGDfqe1MTE5weaQEwKddHfx+/Tyt74sXJ1dDEZnJIIQ1rTniCBY+lWZ2bZqD3buZsttECeWdr19i0xcvUmKCDe3rWLFsGa4iJ2cy8J4l8zKM3CzzTEOK4vVJdh17i9psDa2LWlBTlixqRr1iXhksDvPLmZ5eFT0abD106aw4fa6ilnaiOFFUDKdGIvsNUWoCEeXiwB9IRRCnhDSOlaf+XFc8fK0b7/3/Yvm2lu6l7zVdeBQfPu7/K9NutavIwKP4e594fYOHzxflAAAAAElFTkSuQmCC",
  "title": "7 Days (Les 7 jours du talion)",
  "author": "Delores Creggan",
  "numberOfPages": 640,
  "publishDate": "2/18/2005",
  "haveRead": true
}]

router.use(bodyParser.urlencoded({ extended: true,limit: '5mb'}));
// router.use(bodyParser.json({ extended: true,limit: '5mb'}));
// router.use(bodyParser.json({ extended: true }));


// CREATES A NEW BOOK IN LIBRARY
// router.post('/', function (req, res) {
//   console.log(req);
//   console.log(req.body);
//   Library.create({
//       coverImage : req.body.coverImage,
//       title : req.body.title,
//       author : req.body.author,
//       publishDate : new Date(req.body.publishDate.toString()),
//       numberOfPages : req.body.numberOfPages,
//       haveRead: req.body.haveRead
//     },
//     function (err, book) {
//       if (err) return res.status(500).send("There was a problem adding the information to the database.");
//       res.status(200).send(book);
//     });
// });

router.post('/', function (req, res) {
  for (var i = 0; i < req.body.books.length; i++) {
    req.body.books[i].numberOfPages = parseInt(req.body.books[i].numberOfPages)
    req.body.books[i].publishDate = new Date(req.body.books[i].publishDate.toString())
  }
  Library.collection.insert(req.body.books,
    function (err, book) {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(book);
    });
});


router.get('/paginate/:page/:numResultsPerPage', function(req, res) {
    var perPage = parseInt(req.params.numResultsPerPage)
    var page = req.params.page || 1
    Library.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, books) {
      if (err) return res.status(500).send("There was a problem.");
      res.status(200).send(books);
        })
})

// GETS A RANDOM BOOK OUT OF THE DATABASE
router.get('/randomBook', function (req, res) {
    Library.aggregate([{$sample:{size: 1}}],
      function (err, book) {
        if (err) return res.status(500).send("There was a problem.");
        res.status(200).send(book);
      });
})

router.get('/tenRandomBooks', function (req, res) {
    Library.aggregate([{$sample:{size: 10}}],
      function (err, book) {
        if (err) return res.status(500).send("There was a problem.");
        res.status(200).send(book);
      });
})

// RETURNS ALL BOOKS IN THE DATABASE
router.get('/', function (req, res) {
 Library.find({}, function (err, books) {
     if (err) return res.status(500).send("There was a problem finding books in library.");
     res.status(200).send(books);
 });
});

router.get('/:id', function (req, res) {
 Library.findById(req.params.id, function (err, books) {
     if (err) return res.status(500).send("There was a problem finding books in library.");
     res.status(200).send(books);
 });
});

router.get('/search/:title/:author/:numberOfPages/:publishDate', function (req, res) {
  var searchFields = []
  var regEx = /[|]/gi
  if(req.params.title !== 'undefined'){
    var adjustedSearchParam = "";
    adjustedSearchParam = req.params.title.replace(regEx,"|")
    searchFields.push({title:{ $regex: new RegExp(adjustedSearchParam), $options: 'igx' }})
  }
  if(req.params.author !== 'undefined'){
    var adjustedSearchParam = "";
    adjustedSearchParam = req.params.title.replace(regEx,"|")
    searchFields.push({author:{ $regex: new RegExp(req.params.author), $options: 'igx' }})
  }
  if(req.params.numberOfPages !== 'undefined'){
    searchFields.push({numberOfPages: req.params.numberOfPages})
  }
  if(req.params.publishDate !== 'undefined'){
    searchFields.push({publishDate: req.params.publishDate})
  }
  //let text = req.params.search, pattern = new RegExp(text), patternMatch = { $regex: pattern, $options: 'igx' }, ;
 Library.find({$or: searchFields}, function (err, books) {
     if (err) return res.status(500).send("There was a problem finding books in library.");
     res.status(200).send(books);
 });
});


// http://127.0.0.1:3002/Library/5b5246c2d90da3287d1cd22d
//UPDATES A BOOK WITH SELECTED
router.put('/:id',function(req,res){


  Library.findByIdAndUpdate(req.params.id,{title:req.body.title,author:req.body.author,publishDate:new Date(req.body.publishDate.toString()),numberOfPages:req.body.numberOfPages,haveRead:req.body.haveRead},{new:true},function(err,book){
    if(err){
      return res.status(500).send("There was a problem updating the book");
    }else{
      res.status(200).send("Book by " + book.title + " was updated.")
    }
  })
})


//DELETES A BOOK WITH SELECTED ID
router.delete('/:id', function (req, res) {
    Library.findByIdAndRemove(req.params.id, function (err, book) {
        if (err) return res.status(500).send("There was a problem deleting the book.");
        res.status(200).send("Book by "+ book.title +" was deleted.");
    });
});

module.exports = router;

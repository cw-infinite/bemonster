## 프로그래밍 일지

* [GitHub Pages Setup](https://github.com/gitname/react-gh-pages)
* 시작은 npx create-react-app plotty
* npm install react-plotly.js plotly.js --save-dev
* npm install plotly.js-dist //중요
* Dev Environment. 

* Dev Environment did not run react integrated plotty. found out about new line
git config --global credential.helper wincred
// put this in index.html
<script crossorigin src="https://cdn.plot.ly/plotly-latest.min.js"></script>
// Semantic UI
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />
   

// in App.js
import createPlotlyComponent from 'react-plotly.js/factory';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);
## TODO
[] integrate dev -> prod.


import createPlotlyComponent from 'react-plotly.js/factory';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

npm install gh-pages --save-dev

git config --global credential.helper wincred

npm install react-plotly.js plotly.js --save-dev

semantic ui cdn

npm install react-color --save-dev

``` to deploy 
npm run deploy
```
import documentReady from "./helpers/documentReady";
import lazyImages from './modules/lazyImages';
import linkSmooth from './components/linkSmooth'
import activeLink from "./components/activeLink";
import sprite from "./components/sprite";
documentReady(()=>{
	console.log('ready');
	lazyImages();
	linkSmooth();
	activeLink();
	sprite();
})
// Static asset imports
import profilePlaceholder from './ui/profile-placeholder.png';

// Element SVGs
import anemoIcon from './elements/Anemo.svg?url';
import cryoIcon from './elements/Cryo.svg?url';
import dendroIcon from './elements/Dendro.svg?url';
import electroIcon from './elements/Electro.svg?url';
import geoIcon from './elements/Geo.svg?url';
import hydroIcon from './elements/Hydro.svg?url';
import pyroIcon from './elements/Pyro.svg?url';

// Element icon mapping
const elementIcons: Record<string, string> = {
	Anemo: anemoIcon,
	Cryo: cryoIcon,
	Dendro: dendroIcon,
	Electro: electroIcon,
	Geo: geoIcon,
	Hydro: hydroIcon,
	Pyro: pyroIcon
};

export const getElementIcon = (element: string): string => {
	return elementIcons[element] || elementIcons.Anemo;
};

// Exported asset URLs
export const assets = {
	placeholders: {
		character: profilePlaceholder
	},
	elements: elementIcons,
	getElementIcon
};


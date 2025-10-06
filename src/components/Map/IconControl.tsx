import { Control, DomUtil } from 'leaflet';
import type { Dispatch, SetStateAction } from 'react';

class IconControl extends Control {
  private setShowIcons: Dispatch<SetStateAction<boolean>>;
  private showIcons: boolean;
  private button1: HTMLButtonElement | null = null;
  private button2: HTMLButtonElement | null = null;

  constructor(setShowIcons: Dispatch<SetStateAction<boolean>>, showIcons: boolean) {
    super({ position: 'topleft' });
    this.setShowIcons = setShowIcons;
    this.showIcons = showIcons;
  }

  updateButtonStyles() {
    const baseClasses = 'px-[15px] border-2 py-[10px] bg-pink-600 text-white rounded-full hover:bg-pink-700';
    
    if (this.button1) {
      this.button1.setAttribute('class', 
        `${baseClasses} ${!this.showIcons ? 'border-[#facc15]' : 'border-none'}`
      );
    }
    
    if (this.button2) {
      this.button2.setAttribute('class',
        `${baseClasses} ${this.showIcons ? 'border-[#facc15]' : 'border-none'}`
      );
    }
  }

  onAdd(map: L.Map) {
    const container = DomUtil.create('div', 'leaflet-bar leaflet-control !border-none');
    const controlDiv = DomUtil.create('div', 'flex flex-row items-center gap-2 rounded-lg', container);
    
    this.button1 = DomUtil.create('button', '', controlDiv);
    this.button1.innerHTML = 'Siffror';
    this.button1.onclick = (e) => {
      e.stopPropagation();
      this.showIcons = false;
      this.setShowIcons(false);
      this.updateButtonStyles();
    };

    this.button2 = DomUtil.create('button', '', controlDiv);
    this.button2.innerHTML = 'Loggor';
    this.button2.onclick = (e) => {
      e.stopPropagation();
      this.showIcons = true;
      this.setShowIcons(true);
      this.updateButtonStyles();
    };

    this.updateButtonStyles();
    // DomUtil.disableClickPropagation(container);
    return container;
  }

  onRemove(map: L.Map) {
    this.button1 = null;
    this.button2 = null;
  }
}

export default IconControl;
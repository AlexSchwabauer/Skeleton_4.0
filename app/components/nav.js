Polymer({
    isShrunk: true,
    navIcon: 'menu',
    toggleNav: function () {
        if(!this.isShrunk) {
            this.$.wrap.classList.add('shrunken');
            this.navIcon = 'menu';
        }
        else {
            this.$.wrap.classList.remove('shrunken');
            this.navIcon = 'arrow-back';
        }

        this.isShrunk = ! this.isShrunk;
    }
});
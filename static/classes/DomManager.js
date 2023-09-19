export default class DomManager {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.currentPageEl = document.querySelector('.active');
        for (const button of document.querySelectorAll('button')) {
            if (button.id === 'last') { 
                button.addEventListener('click', () => {
                    location.reload();
                });
            } else {
                button.addEventListener('click', () => {
                    this.navigate(this.currentPageIndex + 1);
                });
            }
        }
        this.currentPageIndex = 1;
        this.pageContentObj = {};
    }

    setTitle(text) {
        document.querySelector('.active h1').textContent = text;
    }

    setSubheading(text) {
        document.querySelector('.active h2').textContent = text;
    }

    setBody(text) {
        document.querySelector('.active p').textContent = text;
    }

    setPageContent(pageContentObj, pageNumber) {
        this.pageContentObj[pageNumber] = pageContentObj;
    }

    updateBodyBackgroundColor(pageNumber) {
        const pageColorVar = `--page${pageNumber}-color`;
        const pageColor = getComputedStyle(document.documentElement).getPropertyValue(pageColorVar);
        document.body.style.backgroundColor = pageColor;
    }

    navigate(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.pages.length) {
            console.log('Invalid page number');
            return;
        }

        if (pageNumber !== 1) {
            this.currentPageEl.classList.add('deactivated');
        }

        this.pages.forEach((page, index) => {
            if(index === pageNumber - 1) {
                page.classList.add('active');
                page.querySelector('h1').textContent = this.pageContentObj[pageNumber].title;
                page.querySelector('h2').textContent = this.pageContentObj[pageNumber].subheading;
                page.querySelector('p').textContent = this.pageContentObj[pageNumber].body;
            } else {
                page.classList.remove('active');
            }
        });

        this.updateBodyBackgroundColor(pageNumber); // Update body background color here

        this.currentPageIndex = pageNumber;
        this.currentPageEl = document.querySelector('.active');
    }
}

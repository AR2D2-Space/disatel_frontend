<template>
    <div>
        <div
            v-if="totalPages > 0"
            class="vue-ads-flex vue-ads-m-2 vue-ads-px-0 vue-ads-text-xs">
            <div
                v-if="totalPages > 1"
                class="vue-ads-flex-grow vue-ads-flex vue-ads-justify-end">
                <button @click="pageChange('previous')"
                    :disabled="previousPage == null"
                    class="buttonPagination">
                    <i class="fa fa-angle-double-left"></i>
                </button>
                <button
                    v-for="button in totalPages"
                    :key="button"
                    v-text="button"
                    :disabled="page == button"
                    :class="[ active ? 'buttonActive' : 'buttonPagination' ]"
                    v-show="show(button)"
                    @click="pageChange(button)"
                    class="buttonPagination">
                    <i
                        v-if="loading"
                        class="fa fa-spinner fa-spin"/>
                </button>
                <button @click="pageChange('next')"
                    :disabled="nextPage  == null"
                    class="buttonPagination">
                    <i class="fa fa-angle-double-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Pagination',
    props: ['Mdpath'],
    data () {
        return {
            page: 1,
            maxVisiblePages: 6,
            loading: false,
            active: false,
            previousButton: null,
            nextButton: null
        };
    },
    computed: {
        ...mapState(['totalItems', 'itemsPerPage', 'previousPage', 'nextPage']),

        totalPages() {
            if (this.itemsPerPage === 0) {
                return 0;
            }
            return Math.ceil(this.totalItems / this.itemsPerPage);
        },//ya//
        // pages () {
        //     let filteredPages = this.filteredPages;
        //     let pages = filteredPages ?
        //         [
        //             filteredPages[0] - 1 === 1 ? 1 : '...',
        //             ...filteredPages,
        //             filteredPages[filteredPages.length - 1] + 1 === this.totalPages - 2 ? this.totalPages - 2 : '...',
        //         ] :
        //         [
        //             ...Array(this.totalPages - 2).keys(),
        //         ].map(page => page + 1);
        //     return [
        //         this.page - 1,
        //         0,
        //         ...pages,
        //         this.totalPages - 1,
        //         this.page + 1,
        //     ];
        // },
        // filteredPages () {
        //     let diff = this.maxVisiblePages / 2;
        //     let toFilterPages = [
        //         ...Array(this.totalPages).keys(),
        //     ].slice(2, -2);
        //     if (toFilterPages.length > this.maxVisiblePages) {
        //         let diffFirst = this.page - toFilterPages[0];
        //         let diffLast = this.page - toFilterPages[toFilterPages.length - 1];
        //         if (diffFirst < diff) {
        //             return toFilterPages.slice(0, this.maxVisiblePages);
        //         } else if (diffLast >= -diff) {
        //             return toFilterPages.slice(-this.maxVisiblePages);
        //         } else {
        //             return toFilterPages.filter(page => {
        //                 let diffPage = this.page - page;
        //                 return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff;
        //             });
        //         }
        //     }
        //     return null;
        // },
    }, 
    methods: {
        show(button) {
            if (( this.page == 1) || (this.page == this.totalPages )) {
                return true;
            } else if ( this.previousButton == (this.page - 1) || this.nextButton == (this.page + 1)) {
                return true;
            } else if (button == (this.page - 1) || button  == (this.page + 1)) {
                return true;
            } else { return false; }
        },
        getPages(pageGo) {
            this.page = pageGo;
            this.previousButton = pageGo - 1;
            this.nextButton = pageGo + 1;
            const path = this.Mdpath + `page=${this.page}`;
            this.$store.dispatch('getItems', path);
            this.active = true;
        },
        pageChange(param) {
            if (param == 'previous') {
                const pageGo = this.previousPage.split("=")[1];
                !pageGo ?
                    this.getPages(1) : this.getPages(pageGo)
                
            } else if (param == 'next') {
                const pageGo = this.nextPage.split("=")[1];
                this.getPages(pageGo);
            } else {                
                this.getPages(param);
            }
        },
    },
};
</script>

<style scoped>
.buttonPagination {
    cursor: pointer;
    background: transparent;
    border: none;
}
.buttonActive {
    cursor: pointer;
    background: aquamarine;
}
</style>
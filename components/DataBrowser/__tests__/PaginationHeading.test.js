import { mount } from '@vue/test-utils';
import PaginationHeading from '@/components/DataBrowser/PaginationHeading.vue';

describe('PaginationHeading.vue', () => {
    it('renders props.totalCount when passed', () => {
        const count = 10;
        const $route = {
            path: '/data/browser',
            query: {
                type: 'dataset',
                page: '1',
                limit: '5',
            }
        }
        const wrapper = mount(PaginationHeading, {
            propsData: { count },
            mocks: { $route }
        })
        expect(wrapper.html()).toContain((count).toString());
    })
})
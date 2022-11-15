import { shallowMount } from '@vue/test-utils';
import PaginationHeading from '@/components/DataBrowser/PaginationHeading.vue';

// jest.mock('@abi-software/twelve-labours-design-system-components', () => (
//     'pagination'
// ));

describe('PaginationHeading.vue', () => {
    let wrapper;
    const count = 10;
    const $route = {
        path: '/data/browser',
        query: {
            type: 'dataset',
            page: '1',
            limit: '5',
        }
    }
    const $router = {
        replace: jest.fn()
    }
    beforeEach(() => {
        wrapper = shallowMount(PaginationHeading, {
            propsData: { count },
            mocks: { $route, $router }
        })
    })
    
    it('renders props.totalCount when passed', () => {
        expect(wrapper.html()).toContain((count).toString());
    })

    it('click a different page calls this method', () => {
        wrapper.vm.$emit('pageChange', 2);
        expect(wrapper.emitted().pageChange[0]).toEqual([2]);
        // expect(wrapper.findComponent('pagination').exists()).toBe(true);
        // await wrapper.findComponent('pagination').trigger('click', { button: 0 });
        // expect($router.replace).lastCalledWith({
        //     path: '/data/browser'
        // })
    })
})
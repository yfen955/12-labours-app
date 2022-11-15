import { mount } from '@vue/test-utils';
import FilterData from '@/components/DataBrowser/FilterData.vue';

describe('FilterData.vue', () => {
    let wrapper;
    const searchContent = 'search';
    const allFilterDict = {
        organ: ['heart']
    };
    const $route = {
        query: {
            type: 'dataset',
            limit: 5
        }
    }
    beforeEach(() => {
        wrapper = mount(FilterData, {
            propsData: { searchContent, allFilterDict },
            mocks: { $route }
        })
    })

    it('renders text when passed', () => {
        expect(wrapper.text()).toContain('Refine results');
    })
})
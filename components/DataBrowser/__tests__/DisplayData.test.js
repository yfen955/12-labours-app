import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import DisplayData from '@/components/DataBrowser/DisplayData.vue';

describe('DisplayData.vue', () => {
    let wrapper;
    const isLoadingSearch = true;
    const dataDetails = [{
        submitter_id: 0,
        dataset_descriptions: [{
            id: 1,
            title: 'title content',
            study_organ_system: 'study organ system',
            keywords: 'keywords',
            number_of_samples: 'number_of_samples',
            number_of_subjects: 'number_of_subjects',
        }]
    }]
    const payload = {
        program: 'program',
        project: 'project'
    }
    const totalCount = 100;
    const $route = {
        path: '/data/browser',
        query: {
            type: 'dataset',
        }
    }
    beforeEach(() => {
        wrapper = shallowMount(DisplayData, {
            propsData: { isLoadingSearch, dataDetails, payload, totalCount },
            mocks: { $route },
            stubs: { NuxtLink: RouterLinkStub }
        })
    })

    it('renders data content when passed', async () => {
        // render data content
        expect(wrapper.html()).toContain('study organ system');
        // render image place holder
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.html()).toContain('alt="image for the dataset"');
        // render the link
        const link = wrapper.findComponent(RouterLinkStub);
        expect(link.exists()).toBe(true);
        expect(link.text()).toMatch('title content');
        // click the link
        await link.trigger('click');
    })
})
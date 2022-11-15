import { mount } from '@vue/test-utils';
import copyLink from '@/components/Map/copyLink.vue';

describe('copyLink.vue', () => {
    it('Click on the copy button calls this method', async () => {
        const $router = {
            path: '/some/path',
            currentRoute: {
                fullPath: 'full-path',
            }
        };
        document.execCommand = jest.fn();
        const wrapper = mount(copyLink, {
            mocks: { $router }
        });
        expect(wrapper.text()).toMatch("Copy the link");
        await wrapper.find('button').trigger('click');
        expect(wrapper.vm.copied).toBe(true);
    })
})
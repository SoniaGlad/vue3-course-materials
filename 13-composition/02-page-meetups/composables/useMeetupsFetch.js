import { onMounted, ref } from '../vendor/vue.esm-browser.js';

export function useMeetupsFetch() {
  const meetups = ref(null);

  const fetchMeetups = () => fetch('./api/meetups.json').then((res) => res.json());

  onMounted(() => {
    fetchMeetups().then((receivedMeetups) => {
      meetups.value = receivedMeetups;
    });
  });

  return {
    meetups,
  };
}

const { createApp } = Vue

createApp({
    data() {
        return {
            jobs: [],
            loading: false,
            error: ''
        }
    },
    async mounted() {
        try {
            const response = await fetch('https://jsonfakery.com/jobs');

            if(!response.ok) {
                throw new Error(`Http error: ${response.status}`);
            }

            this.jobs = await response.json();
        }
        catch(e) {
            this.error = e.message;
        }
        finally {
            this.loading = false;
        }
    }
}).mount('#table')
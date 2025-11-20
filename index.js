const { createApp } = Vue

createApp({
    data() {
        return {
            jobs: [],
            loading: false,
            error: ''
        }
    },
    computed: {
        getHeaders() {
            if(this.jobs && this.jobs.length > 0) {
                return Object.keys(this.jobs[0]).map(k => k.replace(/_/g, ' '));
            }

            return [];
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
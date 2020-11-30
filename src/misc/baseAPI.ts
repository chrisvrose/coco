export default interface baseAPI {
    pkg: any;
    entity?: any;
    methods: {
        url: string;
        method: 'get' | 'post' | 'put' | 'delete';
        function: string;
    }[];
}

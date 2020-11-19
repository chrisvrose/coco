export default interface baseAPI {
    pkg: any;
    /**
     * base entity, set if required
     */
    entity?: any;
    methods: {
        url: string;
        method: 'get' | 'post' | 'put' | 'delete';
        function: string;
    }[];
}

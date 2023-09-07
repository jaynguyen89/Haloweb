import { Environments, InterceptorTarget, RequestContentTypes, RequestMethods } from 'src/commons/enums';
import { Interceptor, InterceptorChain } from 'src/fetcher/Interceptor';
import RequestOption from 'src/fetcher/RequestOption';
import configs from 'src/commons/configs';
import Request from 'src/fetcher/Request';
import IAuthenticatedUser from 'src/models/AuthenticatedUser';

class RequestBuilder<T> {
    baseUrl: string;
    method: RequestMethods = RequestMethods.GET;
    endpoint: string = '';
    headers?: Map<string, string>;
    queries?: Map<string, string>;
    body?: Record<string, unknown>;
    form?: Map<string, File | FileList>;
    requestInterceptors?: Array<Interceptor>;
    responseInterceptors?: Array<Interceptor>;
    options?: RequestOption;
    downloadResponse?: boolean;

    constructor(baseUrl?: string) {
        if (baseUrl)
            this.baseUrl = baseUrl;
        else {
            switch (configs.environment) {
                case Environments.PROD:
                    this.baseUrl = configs.prodBaseUrl;
                    break;
                case Environments.TEST:
                    this.baseUrl = configs.testBaseUrl;
                    break;
                case Environments.UAT:
                    this.baseUrl = configs.uatBaseUrl;
                    break;
                default:
                    this.baseUrl = configs.devBaseUrl;
                    break;
            }
        }
    }

    public withMethod(method: RequestMethods): RequestBuilder<T> {
        this.method = method;
        return this;
    }

    /* Pass the endpoint without leading or trailing slashes */
    public withEndpoint(endpoint: string): RequestBuilder<T> {
        this.endpoint = endpoint;
        return this;
    }

    public withHeaders(headers: Map<string, string>): RequestBuilder<T> {
        this.headers = headers;
        return this;
    }

    public withHeader(key: string, header: string): RequestBuilder<T> {
        if (!this.headers) this.headers = new Map<string, string>();
        this.headers.set(key, header);
        return this;
    }

    public withQueries(queries: Map<string, string>): RequestBuilder<T> {
        this.queries = queries;
        return this;
    }

    public withQuery(key: string, query: string): RequestBuilder<T> {
        if (!this.queries) this.queries = new Map<string, string>();
        this.queries.set(key, query);
        return this;
    }

    public withBody(body: object): RequestBuilder<T> {
        this.body = body as Record<string, unknown>;
        return this;
    }

    public withBodyPart(key: string, value: unknown): RequestBuilder<T> {
        if (!this.body) this.body = {};
        this.body[key] = value;
        return this;
    }

    public withForm(form: Map<string, File | FileList>): RequestBuilder<T> {
        this.form = form;
        return this;
    }

    public withFormPart(key: string, value: File | FileList): RequestBuilder<T> {
        if (!this.form) this.form = new Map<string, File | FileList>();
        this.form.set(key, value);
        return this;
    }

    public withRequestInterceptors(interceptors: Array<Interceptor>): RequestBuilder<T> {
        const isValidRequestInterceptors = interceptors.every(interceptor => interceptor.target === InterceptorTarget.REQUEST);
        if (!isValidRequestInterceptors) throw new Error('The Request Interceptors Array contains invalid element(s).');

        this.requestInterceptors = interceptors;
        return this;
    }

    public withRequestInterceptor(interceptor: Interceptor): RequestBuilder<T> {
        if (interceptor.target !== InterceptorTarget.REQUEST) throw new Error('The Request Interceptors Array contains invalid element(s).');
        if (!this.requestInterceptors) this.requestInterceptors = new Array<Interceptor>();

        this.requestInterceptors.push(interceptor);
        return this;
    }

    public withResponseInterceptors(interceptors: Array<Interceptor>): RequestBuilder<T> {
        const isValidResponseInterceptors = interceptors.every(interceptor => interceptor.target === InterceptorTarget.RESPONSE);
        if (!isValidResponseInterceptors) throw new Error('The Response Interceptors Array contains invalid element(s).');

        this.responseInterceptors = interceptors;
        return this;
    }

    public withResponseInterceptor(interceptor: Interceptor): RequestBuilder<T> {
        if (interceptor.target !== InterceptorTarget.RESPONSE) throw new Error('The Response Interceptors Array contains invalid element(s).');
        if (!this.responseInterceptors) this.responseInterceptors = new Array<Interceptor>();

        this.responseInterceptors.push(interceptor);
        return this;
    }

    public withOptions(options: RequestOption): RequestBuilder<T> {
        this.options = options;
        return this;
    }

    public setDownloadResponse(downloadResponse: boolean): RequestBuilder<T> {
        this.downloadResponse = downloadResponse;
        return this;
    }

    public build(authenticatedUser?: IAuthenticatedUser): Request<T> {
        if ((this.method === RequestMethods.GET || this.method === RequestMethods.DELETE) && (this.body || this.form))
            throw new Error('The request METHOD is invalid, consider to use \'POST\', or \'PUT\', or \'PATCH\'.');

        if ((
            this.method === RequestMethods.POST || this.method === RequestMethods.PUT || this.method === RequestMethods.PATCH
        ) && !this.body && !this.form)
            throw new Error('The request METHOD is invalid, consider to use \'GET\', or \'DELETE\'.');

        const endpointUrl = this.buildEndpointUrl();
        const headers = this.buildHeaders(authenticatedUser);
        const body = this.buildBody();
        const interceptorChains = this.buildInterceptorChains();

        return new Request<T>(
            endpointUrl,
            this.method,
            headers,
            body,
            interceptorChains[0],
            interceptorChains[1],
            this.options,
            this.downloadResponse,
        );
    }

    private buildEndpointUrl(): string {
        let endpointUrl = `${this.baseUrl}${this.endpoint}`;
        if (this.queries) {
            endpointUrl = `${endpointUrl}?`;
            const lastKey = Array.from(this.queries.keys()).pop();
            this.queries.forEach((value, key) => endpointUrl = `${endpointUrl}${key}=${value}${key === lastKey ? '' : '&'}`);
        }

        return endpointUrl;
    }

    private buildHeaders(authenticatedUser?: IAuthenticatedUser): Record<string, string | undefined> {
        const authenticationHeaders = authenticatedUser
            ? {
                UserId: authenticatedUser.userId,
                Authorization: `Bearer ${authenticatedUser.jwtToken}`,
            }
            : {};

        const acceptHeaders = {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };

        const contentHeaders = this.form
            ? { 'Content-Type': RequestContentTypes.FORM_DATA }
            : { 'Content-Type': RequestContentTypes.JSON };

        const headers: { [k: string]: string | undefined } = {
            ...authenticationHeaders,
            ...acceptHeaders,
            ...contentHeaders,
        };

        if (this.headers) {
            this.headers.forEach((value, key) => headers[key] = value);
        }

        return headers;
    }

    private buildBody(): string | FormData | undefined {
        if (this.form) {
            const formData = new FormData();
            this.form.forEach((value, key) => {
                if (value instanceof File)
                    formData.append(key, value as File, (value as File).name);
                else
                    Array.from(value).forEach((file) => formData.append(key, file as File, (file as File).name));
            });

            if (this.body)
                Object.keys(this.body).forEach((k) => formData.append(k, this.body?.[k] as string));

            return formData;
        }

        if (this.body) return JSON.stringify(this.body);

        return undefined;
    }

    private buildInterceptorChains(): [InterceptorChain | undefined, InterceptorChain | undefined] {
        let requestInterceptorChain = undefined;
        let responseInterceptorChain = undefined;

        let currentInterceptorChain = undefined;
        let nextInterceptorChain = undefined;
        
        if (this.requestInterceptors) {
            if (this.requestInterceptors.length === 1) requestInterceptorChain = new InterceptorChain(this.requestInterceptors[0].callback);
            else for (let i = 0; i < this.requestInterceptors.length; i++) {
                if (i === 0) {
                    nextInterceptorChain = new InterceptorChain(this.requestInterceptors[i + 1].callback);
                    requestInterceptorChain = new InterceptorChain(this.requestInterceptors[i].callback, nextInterceptorChain);
                    continue;
                }

                if (i === this.requestInterceptors.length - 1) continue;

                currentInterceptorChain = nextInterceptorChain;
                nextInterceptorChain = new InterceptorChain(this.requestInterceptors[i + 1].callback);
                currentInterceptorChain!.next = nextInterceptorChain;
            }
        }

        currentInterceptorChain = undefined;
        nextInterceptorChain = undefined;
        
        if (this.responseInterceptors) {
            if (this.responseInterceptors.length === 1) responseInterceptorChain = new InterceptorChain(this.responseInterceptors[0].callback);
            else for (let i = 0; i < this.responseInterceptors.length; i++) {
                if (i === 0) {
                    nextInterceptorChain = new InterceptorChain(this.responseInterceptors[i + 1].callback);
                    responseInterceptorChain = new InterceptorChain(this.responseInterceptors[i].callback, nextInterceptorChain);
                    continue;
                }

                if (i === this.responseInterceptors.length - 1) continue;

                currentInterceptorChain = nextInterceptorChain;
                nextInterceptorChain = new InterceptorChain(this.responseInterceptors[i + 1].callback);
                currentInterceptorChain!.next = nextInterceptorChain;
            }
        }
        
        return [requestInterceptorChain, responseInterceptorChain];
    }
}

export default RequestBuilder;

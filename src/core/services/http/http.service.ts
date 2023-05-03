import {
  catchError,
  finalize,
  map,
  NEVER,
  Observable,
  Subject,
  throwError,
} from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import {
  isNullOrUndefined,
  isStrEmpty,
  nullSafetyJSONStringify,
} from "@core/helpers/helpers";
import StorageService from "../storage";
import {
  HttpOptions,
  HttpMethod,
  RequestContentType,
  ProgressOptions,
} from "./http.type";
import { ACCESS_TOKEN_KEY } from "@app/constants";
import { Environment } from "@environments/environment";
import { addToast } from "@app/components/toast/toast.service";
import { SystemMessage } from "@app/constants/message.const";

class _HttpService {
  public isRequesting$ = new Subject<boolean>();
  public onError$ = new Subject<any>();

  private _commonHeader = {
    "Content-Type": "application/json",
  };

  public get<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public patch<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.PATCH, options);
  }

  public delete<T>(uri: string, options?: HttpOptions): Observable<T> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  public requestUpload<T>(
    uri: string,
    method = HttpMethod.POST,
    progressHandler: (ajaxResponse: AjaxResponse<any>) => void,
    options?: HttpOptions
  ): Observable<T> {
    const headers = {
      ...options?.headers,
      "Content-Type": "application/octet-stream",
    };

    const newOptions: HttpOptions = {
      ...options,
      headers,
      requestContentType: RequestContentType.BINARY_STREAM,
    };

    return this.request(uri, method, newOptions, {
      includeUploadProgress: true,
      progressHandler,
    });
  }

  private request<T>(
    uri: string,
    method: string,
    options?: HttpOptions,
    progressOptions?: ProgressOptions
  ): Observable<T> {
    const token = this.getAccessToken();
    let url = this.resolveUri(uri);

    if (options?.queryParams) {
      url = url + "?" + this.generateHttpParams(options?.queryParams);
    }

    let body: any = nullSafetyJSONStringify(this.buildBodyData(options?.body));

    if (options?.requestContentType) {
      switch (options?.requestContentType) {
        case RequestContentType.MULTIPART:
          body = this.buildFormData(options?.body);
          break;
        case RequestContentType.BINARY_STREAM:
          body = options.body;
          break;
      }
    }

    this.isRequesting$.next(true);

    return ajax({
      url,
      method,
      body,
      headers: {
        ...(options?.requestContentType === RequestContentType.MULTIPART
          ? { Accept: "application/json" }
          : this._commonHeader),
        Authorization: token ? `Bearer ${token}` : "",
        ...options?.headers,
      },
      includeUploadProgress: progressOptions?.includeUploadProgress,
    }).pipe(
      map((ajaxResponse) => {
        progressOptions?.progressHandler &&
          progressOptions?.progressHandler(ajaxResponse);

        return this.handleResponse<T>(ajaxResponse);
      }),
      catchError((error) => {
        this.onError$.next(error);

        const message = error?.response?.message ?? SystemMessage.UNKNOWN_ERROR;

        addToast({ text: message, status: "inValid" });

        if (process.env.NODE_ENV === "development") {
          this.isRequesting$.next(false);

          return NEVER;
        }

        return throwError(() => error);
      }),
      finalize(() => {
        this.isRequesting$.next(false);
      })
    );
  }

  protected buildBodyData(data: any) {
    return data || Object.create(null);
  }

  protected buildFormData(data: any) {
    const formData = new FormData();

    for (const key in data) {
      if (data[key]) {
        if (data[key] instanceof File) {
          formData.append(key, data[key], data[key].name);
        } else if (Array.isArray(data[key])) {
          for (const item of data[key]) {
            formData.append(key, item);
          }
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    return formData;
  }

  public handleResponse<T>(ajaxResponse: AjaxResponse<any>): T {
    return ajaxResponse.response;
  }

  private resolveUri(uri: string): string {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }

    return `${Environment.BASE_API}${uri}`;
  }

  private generateHttpParams(params: object) {
    const httpParams: string[] = [];
    const objectToQueryString = (obj: object, prefix?: any) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const k = prefix ? prefix + "[" + key + "]" : key;
          const v = (obj as any)[key];

          if (Array.isArray(v)) {
            for (const vv of v) {
              httpParams.push(k + "=" + vv);
            }
          } else if (v !== null && typeof v === "object") {
            objectToQueryString(v, k);
          } else {
            if (!isNullOrUndefined(v) && !isStrEmpty(v.toString())) {
              httpParams.push(k + "=" + v);
            }
          }
        }
      }
    };

    objectToQueryString(params);

    return encodeURI(httpParams.join("&"));
  }

  public getAccessToken() {
    return (
      StorageService.get(ACCESS_TOKEN_KEY) ||
      StorageService.getSession(ACCESS_TOKEN_KEY)
    );
  }
}

const HttpService = new _HttpService();

export default HttpService;

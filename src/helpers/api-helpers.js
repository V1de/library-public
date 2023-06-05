export const methods = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE'
};

export const getResourceFromApi = async (url, query, method = methods.get, body, headers = {}) => {
  const token = localStorage.getItem('token');
  const absUrl = new URL(`${process.env.REACT_APP_API_HOST}/${url}`);

  if (query) {
    Object.keys(query).forEach((key) => absUrl.searchParams.append(key, query[key]));
  }

  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `${token}`;
  }

  const res = await fetch(absUrl, {
    method,
    body,
    headers: {
      ...headers
    }
  });

  const contentType = res.headers.get('Content-Type');
  const contentLength = res.headers.get('Content-Length');

  const checkRes = async (type) => {
    const resData = type.includes('application/json') ? await res.json() : await res.blob();

    if (res.ok) return resData?.data ? resData.data : resData;

    if (!res.ok) {
      throw resData?.message;
    }
  };

  return +contentLength > 0 ? checkRes(contentType) : null;
};

export default class ApiService {
  constructor(apiBase) {
    this.apiBase = apiBase;
  }

  getResource = getResourceFromApi;

  getAllItems = async (query) => this.getResource(this.apiBase, query);

  getItemById = async (id, query) => this.getResource(`${this.apiBase}/${id}`, query);

  createItem = async (body) => this.getResource(this.apiBase, null, methods.post, body);

  updateItem = async ({ id, ...other }) => this.getResource(`${this.apiBase}/${id}`, null, methods.patch, other);

  deleteItem = async (id) => this.getResource(`${this.apiBase}/${id}`, null, methods.delete);
}

export const postFiles = async (files) => {
  return await Promise.all(files.map((f) => postFile(f)));
};

export const postFile = async (file) => {
  const formData = new FormData();
  formData.append('files', file);

  const token = localStorage.getItem('token');

  const options = {
    method: methods.post,
    body: formData
  };

  if (token) {
    options.header = {
      Authorization: token
    };
  }

  const response = fetch(`${process.env.REACT_APP_API_HOST}/attachments/upload`, options).then((res) => res.json());
  const res = await response;
  return res[0];
};

export const deleteFiles = async (ids = []) => {
  return await getResourceFromApi('attachments', null, methods.delete, ids);
};

export const deleteFile = (id) => deleteFiles([id]);

export const getImageSrc = (id) => `${process.env.REACT_APP_API_HOST}/attachments/${id}`;

export const getAttachmentUrl = (storageKey) => `${process.env.REACT_APP_PUBLIC_HOST}/uploads/${storageKey}`;

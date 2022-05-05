export interface IFetchImageData {
  results: IResultArray[];
  total: number;
  total_pages: number;
}

interface IResultArray {
  urls: IUrlObject;
  user: IUserInfo;
}

interface IUrlObject {
  regular: string;
}
interface IUserInfo {
  id: string;
  first_name: string;
}

export interface IFetchImageDataFiltered {
  id: string;
  photographer: string;
  image: string;
}
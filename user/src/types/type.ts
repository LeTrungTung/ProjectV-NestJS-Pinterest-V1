export interface IDataUserById {
  id: number;
  username: string;
  email: string;
  password: string;
  role: number;
  avatar: string;
  status: number;
}
export interface ImageChoice {
  // Define the structure of the imageChoice
  id: number;
  userCreateId: number;
  linkImage: string;
  categoryImage: string;
  titleImage: string;
  description: string;
  sourceImage: string;
}
export interface IDataUser {
  user?: any;
  avatar: string;
  email: string;
  id: number;
  password: string;
  role: number;
  status: number;
  username: string;
}
export interface ISaveImage {
  idSaveImage: number;
  imageSavedId: number;
  userSavedId: number;
}
export interface ImageComment {
  user?: any;
  image?: any;
  id: number;
  userCreateId: number;
  linkImage: string;
  categoryImage: string;
  titleImage: string;
  description: string;
  sourceImage: string;
  imageCommentId: number;
  idComment: number;
  username: string;
  content: string;
  timecreate: string;
  avatar: string | null;
}

export interface IOperationImage {
  idOperationImage?: number;
  imageOperationId: number;
  imageOperation: {
    categoryImage: string;
    titleImage: string;
    description: string;
    id: number;
    linkImage: string;
    sourceImage: string;
    userCreateId: number;
  };
  userLikeImageId: number | null;
  userLikeImage?: any;
  userLoveImageId: number | null;
  userLoveImage?: any;
  userSavedImageId: number | null;
  id: number;
  avatar: string;
  username: string;
}
export interface ILikeLoveImage {
  idOperationImage?: number;
  imageOperationId: number;
  userLikeImageId: number | null;
  userLoveImageId: number | null;
  userSavedImageId?: number | null;
}

export interface IFollowUser {
  avatar: string;
  email: string;
  follow: string | null;
  id: number;
  password: string;
  role: number;
  status: number;
  username: string;
  idImage: number;
}
export interface ILikeLoveComment {
  user?: any;
  commentLikeLove?: any;
  userLoveComment?: any;
  userLikeComment?: any;
  idLikeLoveComment: number;
  commentLikeLoveId: number;
  userLikeCommentId: number | null;
  userLoveCommentId: number | null;
  idComment: number;
  avatar: string;
  username: string;
}
export interface IComment {
  idComment: number;
  imageCommentId: number;
  userCommentId: number;
  content: string;
  timecreate: string;
}
export interface ICommentRepply {
  idRepComment: number;
  commentRepId: number | null;
  userRepCommentId: number;
  contentRepComment: string;
  timecreateRep: string;
}
export interface IRepComment {
  idComment: number;
  idRepComment: number;
  commentRepId: number | null;
  userRepCommentId: number;
  contentRepComment: string;
  timecreateRep: string;
  username: string;
  avatar: string | null;
}
export interface IFollow {
  userFollowOthers?: any;
  idFollow?: number;
  userFollowedbyId: number;
  userFollowOtherId: number;
}

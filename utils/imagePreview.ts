/**
 * 이미지 미리보기
 * @param input
 * @param targetId
 */
export const imagePreview = (input: HTMLInputElement, targetId: string): void => {
  const files = input.files as FileList;
  const reader = new FileReader();

  if (!isEmpty(files as FileList)) {
    reader.onload = (e): void => {
      (document.getElementById(targetId) as HTMLImageElement).src = (e.target as FileReader).result as string;
    };

    reader.readAsDataURL(files[0]);
  } else {
    (document.getElementById(targetId) as HTMLImageElement).src = '';
  }
};

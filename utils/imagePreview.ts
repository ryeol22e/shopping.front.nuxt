/**
 * 이미지 미리보기
 * @param input
 * @param targetId
 */
export const imagePreview = (input: HTMLInputElement, targetId: string): void => {
  const files = input.files;
  const reader = new FileReader();

  if (files !== undefined && files !== null) {
    reader.onload = function (e) {
      (document.getElementById(targetId) as HTMLImageElement).src = (e.target as FileReader).result as string;
    };

    reader.readAsDataURL(files[0]);
  } else {
    (document.getElementById(targetId) as HTMLImageElement).src = '';
  }
};
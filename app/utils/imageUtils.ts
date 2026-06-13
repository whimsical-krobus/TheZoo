const DEFAULT_IMAGE = "https://placehold.net/400x400.png";

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = event.currentTarget;
    if (img.src !== DEFAULT_IMAGE) {
        img.src = DEFAULT_IMAGE;
    }
};

export const getImageUrl = (imageUrl: string | undefined): string => {
    return imageUrl && imageUrl.trim() ? imageUrl : DEFAULT_IMAGE;
};
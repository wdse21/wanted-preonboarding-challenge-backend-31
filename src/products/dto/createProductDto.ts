import {
  Product,
  ProductCategory,
  ProductDetail,
  ProductPrice,
  ProductTag,
} from '@libs/database/entities';
import { STATUS } from '@libs/enums';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto extends PickType(Product, [
  'sellerId',
  'brandId',
]) {
  @IsNotEmpty({ message: '상품명은 필수 항목입니다.' })
  @IsString()
  @MaxLength(255, { message: 'Max Length 255' })
  name: string;

  @IsNotEmpty({ message: 'URL 슬러그는 필수 항목입니다.' })
  @IsString()
  @MaxLength(255, { message: 'Max Length 255' })
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Max Length 500' })
  shortDescription?: string;

  @IsOptional()
  @IsString()
  fullDescription?: string;

  @IsNotEmpty({ message: '상품 상태 정보는 필수 항목입니다.' })
  @IsEnum(STATUS.ProductStatus)
  @MaxLength(20, { message: 'Max Length 20' })
  status: STATUS.ProductStatus;
}

// 상품 상세 정보 생성 DTO
export class CreateProductDetailDto extends PartialType(ProductDetail) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: '무게 값은 0보다 커야 합니다.' })
  weight?: number;
}

// 상품 가격 정보 생성 DTO
export class CreateProductPriceDto extends PartialType(ProductPrice) {
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: '기본 가격은 0보다 커야 합니다.' })
  basePrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: '할인 가격은 0보다 커야 합니다.' })
  salePrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: '원가 가격은 0보다 커야 합니다.' })
  costPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: '세율은 0보다 커야 합니다.' })
  taxRate?: number;
}

// 상품 카테고리 정보 생성 DTO
export class CreateProductCategoryDto extends PickType(ProductCategory, [
  'categoryId',
]) {
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}

// 상품 옵션 그룹 정보 생성 DTO
export class CreateProductOptionGroupDto {
  @IsNotEmpty({ message: '상품 옵션 그룹명은 필수 항목입니다.' })
  @IsString()
  @MaxLength(100, { message: 'Max Length 100' })
  name: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionDto)
  productOptions: CreateProductOptionDto[];
}

// 상품 옵션 정보 생성 DTO
export class CreateProductOptionDto {
  @IsNotEmpty({ message: '상품명은 필수 항목입니다.' })
  @IsString()
  @MaxLength(255, { message: 'Max Length 255' })
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: '추가 가격은 0보다 커야 합니다.' })
  additionalPrice?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Max Length 100' })
  sku?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}

// 상품 이미지 생성 DTO
export class CreateProductImageDto {
  @IsNotEmpty({ message: 'url 항목은 필수 항목입니다.' })
  @IsString()
  @MaxLength(255, { message: 'Max Length 255' })
  url: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Max Length 255' })
  altText?: string;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsUUID()
  optionId?: string;

  @IsOptional()
  @IsNumber()
  displayOrder?: number;
}

// 상품 태그 생성 DTO
export class CreateProductTagDto extends PickType(ProductTag, ['tagId']) {}

// 상품 등록 통합 DTO
export class CreateProductPackageDto {
  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  @ValidateNested()
  @Type(() => CreateProductDetailDto)
  productDetail: CreateProductDetailDto;

  @ValidateNested()
  @Type(() => CreateProductPriceDto)
  productPrice: CreateProductPriceDto;

  @ValidateNested({ each: true })
  @Type(() => CreateProductCategoryDto)
  productCategories: CreateProductCategoryDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionGroupDto)
  productOptionGroups: CreateProductOptionGroupDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  productImages: CreateProductImageDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateProductTagDto)
  productTags: CreateProductTagDto[];
}

/**
 * 상품 리뷰
 */

// 상품 리뷰 등록 DTO
export class CreateProductReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}

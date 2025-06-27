import { ProductCategoriesService } from './product-categories.service';
import { TestBed } from '@automock/jest';
import { ProductCategoriesRepository } from './product-categories.repository';
import { Category } from '@libs/database/entities';
import { ProductCategoryRequestDto } from './dto/productCategoryRequestDto';

describe('ProductCategoriesService', () => {
  let productCategoriesService: ProductCategoriesService;
  let productCategoriesRepository: jest.Mocked<ProductCategoriesRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(
      ProductCategoriesService,
    ).compile();

    productCategoriesService = unit;
    productCategoriesRepository = unitRef.get(ProductCategoriesRepository);

    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.useFakeTimers();
  });

  describe('[카테고리 목록 조회] find Method', () => {
    it('[카테고리 목록 조회] find Success', async () => {
      const level = 1;
      const category: Category = {
        id: '99101754-77ba-470c-b2ca-c79408008143',
        name: 'test1',
        slug: 'test-slug',
        description: 'test',
        parentId: null,
        level: 1,
        imageUrl: 'http://test.com',
        childCategories: [],
        parentCategory: {
          id: '2ec1758a-7074-47c3-8d74-fc6af4cc12e6',
          name: 'test12',
          slug: 'test-slug-2',
          description: 'test',
          parentId: null,
          level: 1,
          imageUrl: 'http://test2.com',
          childCategories: [],
          parentCategory: null,
          productCategories: [],
        },
        productCategories: [],
      };

      jest
        .spyOn(productCategoriesRepository, 'find')
        .mockResolvedValue([category]);

      const find = await productCategoriesService.find(level);

      expect(productCategoriesRepository.find).toHaveBeenCalledWith(level);
      expect(productCategoriesRepository.find).toHaveBeenCalledTimes(1);

      expect(find).toEqual({
        success: true,
        data: [category],
        message: '카테고리 목록을 성공적으로 조회했습니다.',
      });
    });

    describe('[특정 카테고리의 상품 목록 조회] findOne Method', () => {
      it('[특정 카테고리의 상품 목록 조회] findOne Success', async () => {
        const categoryId = '99101754-77ba-470c-b2ca-c79408008143';
        const productCategoryRequestDto = new ProductCategoryRequestDto();
        Object.assign(productCategoryRequestDto, {
          sort: 'ASC',
          includeSubcategories: true,
        });

        const category = {
          category: {
            id: '99101754-77ba-470c-b2ca-c79408008143',
            name: 'test1',
            slug: 'test-slug',
            description: 'test',
            level: 1,
            image_url: 'http://test.com',
            parent: {
              id: '2ec1758a-7074-47c3-8d74-fc6af4cc12e6',
              name: 'test1',
              slug: 'test-slug-2',
            },
          },
          item: [
            {
              id: '5affd8e7-4490-4562-b549-cc5cbfe0c4ca',
              name: 'test',
              slug: 'test-slug-item',
              short_description: 'test-short-description',
              base_price: '1000',
              sale_price: '10000',
              currency: 'KRW',
              seller: {
                id: '304df7f7-04cc-4760-9f62-47669a19f149',
                name: 'test-seller',
              },
              brand: {
                id: '1470a36f-14b4-447e-b1bd-5cfed56389ab',
                name: 'test-brand',
              },
              rating: 0,
              review_count: 0,
              status: 'SOLD_OUT',
              created_at: new Date(),
            },
          ],
          pagination: {
            total_items: 10,
            total_pages: Math.ceil(10 / productCategoryRequestDto.getTake()),
            current_page: productCategoryRequestDto.getPage(),
            per_page: productCategoryRequestDto.getTake(),
          },
        };

        jest
          .spyOn(productCategoriesRepository, 'findOneCategoryAndProduct')
          .mockResolvedValue(category);

        const findOne = await productCategoriesService.findOne(
          categoryId,
          productCategoryRequestDto,
        );

        expect(
          productCategoriesRepository.findOneCategoryAndProduct,
        ).toHaveBeenCalledWith(categoryId, productCategoryRequestDto);
        expect(
          productCategoriesRepository.findOneCategoryAndProduct,
        ).toHaveBeenCalledTimes(1);

        expect(findOne).toEqual({
          success: true,
          data: category,
          message: '카테고리 상품 목록을 성공적으로 조회했습니다.',
        });
      });
    });
  });
});

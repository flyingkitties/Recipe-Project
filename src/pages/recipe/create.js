/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import {
  ClockIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MdLabelOutline } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import Footer from '../../components/Footer';

function create() {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  // const [ingredientsInput, setIngredientsInput] = useState(['']);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ingredients: '',
      // [
      //   {
      //     name: '',
      //   },
      // ],
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'ingredients', // unique name for your Field Array
  });

  // console.log('fields!', fields);

  const dietOptions = [
    { name: 'Vegetarian', value: 'Vegetarian', label: 'Vegetarian' },
    { name: 'Keto', value: 'Keto', label: 'Keto' },
    { name: 'Gluten Free', value: 'Gluten Free', label: 'Gluten Free' },
    { name: 'Pescetarian', value: 'Pescetarian', label: 'Pescetarian' },
    { name: 'Vegan', value: 'Vegan', label: 'Vegan' },
    { name: 'Paleo', value: 'Paleo', label: 'Paleo' },
  ];
  const animatedComponents = makeAnimated();

  const onSubmit = (data) => console.log(data);
  //  handleSubmit(async (data) => {
  //   console.log(data);
  //   const notification = toast.loading('creating your recipe...');
  // }
  // );

  return (
    <div className="bg-gray-100">
      {/* Page title */}
      <div className="py-[10%] lg:py-[7%] text-center ">
        <h1 className="text-4xl sm:text-[50px] md:text-[60px] lg:text-[80px] font-bold titleFont ">
          Create a Recipe
        </h1>
      </div>
      {/* Body */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 sm:px-10 md:px-14 lg:px-36">
        <div className=" relative flex bg-white rounded-md shadow-md">
          {/* Left Section container 1 */}
          {/* Image */}
          <div
            className="flex object-cover w-[100px] sm:w-[240px] h-[150px] md:w-[270px]
          md:h-[231px] lg:h-[360px] lg:w-[390px] xl:w-[480px] shrink-0 items-center
          justify-center space-x-1 ">
            <div
              className="flex group items-center
          justify-center hoverGray">
              <div>
                <div
                  className="flex items-center justify-center"
                  onClick={() => setImageBoxOpen(!imageBoxOpen)}
                  tabIndex="0"
                  onKeyDown={() => setImageBoxOpen(!imageBoxOpen)}
                  role="button">
                  {imageBoxOpen ? (
                    <MinusIcon
                      className="iconSmall  group-hover:transition-transform
                      group-hover:rotate-180 "
                    />
                  ) : (
                    <PlusIcon
                      className="iconSmall  group-hover:transition-transform
                      group-hover:rotate-180 "
                    />
                  )}
                  <p className="md:text-lg lg:text-xl">Image</p>
                </div>
                {/* Image URL */}
                <div
                  className={`flex absolute top-0 right-0 left-[100px] sm:left-[240px] md:left-[270px]
                  lg:left-[390px] xl:left-[480px]
          h-full bg-white items-center justify-center ${
            imageBoxOpen === false && 'hidden'
          }`}>
                  <div className="w-full mr-10">
                    <div
                      className="flex w-full items-center mb-2
          justify-center text-xs sm:text-sm md:text-base font-light ">
                      <input
                        {...register('image', { required: true })}
                        className="pl-3 w-full rounded-md shadow-sm
                        lg:p-3 md:p-2 p-1 border border-gray-600 hover:border-gray-500
                 outline-none  text-gray-800  focus:border-orange-400 "
                        type="text"
                        placeholder="Add an Image URL"
                      />
                      {errors.image && <p>Image is required</p>}
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="btnRecipe px-5"
                        onClick={() => {
                          setImageBoxOpen(false);
                        }}
                        onKeyDown={() => {
                          setImageBoxOpen(false);
                        }}>
                        Submit Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section container 1 */}
          <div
            className="flex flex-col mr-10 pl-1 sm:pl-2 md:pl-3 lg:pl-5 w-full h-[150px]
          md:h-[231px] lg:h-[360px] place-content-evenly">
            {/* Title */}
            <div className="">
              <input
                {...register('title', { required: true })}
                className=" w-full rounded-md lg:p-2 md:p-2 pl-3
                text-base sm:text-xl md:text-2xl lg:text-3xl
                 titleFont tracking-wide border border-gray-600 hover:border-gray-500
                 outline-none text-gray-800  focus:border-orange-400"
                type="text"
                placeholder="Title..."
              />
              {errors.title && <p>Title is required</p>}
            </div>
            <div
              className=" text-gray-600 space-y-1 md:space-y-2 lg:space-y-5
             ">
              {/* Ready In */}
              <div className="flex space-x-1 items-center ">
                <ClockIcon className="h-3 w-3" />
                <p className="text-[10px]  md:text-sm lg:text-base font-light">
                  Ready in:{' '}
                </p>
                <div className="text-[10px] md:text-sm lg:text-base font-light">
                  <input
                    {...register('readyInMinutes', { required: true })}
                    className="md:p-1 p-[2px] text-center
                    border border-gray-600 hover:border-gray-500
                 outline-none text-gray-800 rounded-md focus:border-orange-400
                 required:border-red-400"
                    type="text"
                    placeholder="Preparation Time..."
                  />
                  {errors.readyInMinutes && <p>Ready in is required</p>} min
                </div>
              </div>
              {/* Servings  */}
              <div className="flex space-x-1 items-center">
                <UserIcon className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
                  Serves:{' '}
                </p>
                <div className="text-[10px] md:text-sm lg:text-base font-light">
                  <input
                    {...register('servings', { required: true })}
                    className=" md:p-1 p-[2px] text-center
                    border border-gray-600 hover:border-gray-500
                 outline-none text-gray-800 rounded-md focus:border-orange-400"
                    type="text"
                    placeholder="Number of people..."
                  />
                  {errors.servings && <p>Servings is required</p>}
                </div>
              </div>
              <div className="flex space-x-1 items-center">
                <MdLabelOutline className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
                  Source: {session?.user.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Description container 2 */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white p-10 text-gray-600 rounded-md shadow-md my-2">
          <div className="text-justify tracking-wide ">
            <div className=" ">
              <textarea
                {...register('summary', { required: true })}
                className="h-24  border border-gray-600 hover:border-gray-500
                 outline-none text-gray-800 rounded-md  p-2
          pl-4 w-full font-light  focus:border-orange-400"
                placeholder="Write a description..."
              />
              {errors.summary && <p>Description is required</p>}
            </div>
          </div>
        </div>
        {/* This recipe is... container 3 */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2">
          <div className="space-y-4 ">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
              font-semibold text-orange-400">
              This Recipe Is...
            </h1>
            <div className="">
              <Controller
                control={control}
                name="diets"
                render={({ field: { onChange, value } }) => (
                  <Select
                    {...register('diets')}
                    classNames="rounded-md"
                    options={dietOptions}
                    value={value}
                    onChange={onChange}
                    components={animatedComponents}
                    isMulti
                    closeMenuOnSelect={false}
                    // Styles
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 'orange' : 'gray',
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: '0.375rem',
                      colors: {
                        ...theme.colors,
                        primary25: 'orange-300',
                        primary: 'gray-600',
                        primary75: '',
                      },
                    })}
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Ingredients container 4 */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Ingredients
            </h1>
            <button type="button" onClick={() => prepend('')}>
              <PlusCircleIcon className="iconMed" />
            </button>
            <div className="grid grid-cols-1 ms:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-2 lg:gap-">
              {/* List of ingredients TODO */}

              {fields.map((field, index) => (
                <div className="flex items-center" key={field.id}>
                  <Input
                    {...register(
                      `ingredients.${index}`
                      // {required: true,}
                    )}
                    className="w-full flex items-center"
                    type="text"
                    // name={field.name}
                    // defaultValue={field.name}
                    label="Add an ingredient (e.g. 1 cup Flour)"
                    variant="outlined"
                    color="orange"
                    control={control}
                    icon={
                      <TrashIcon
                        className="iconSmall hoverGray"
                        onClick={() => remove(index)}
                      />
                    }
                  />

                  {errors.ingredients && <p>Ingredient is required</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Method container 5 */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2 ">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Method
            </h1>

            <div className="list-disc space-y-5 tracking-wide text-justify">
              <textarea
                {...register('instructions', { required: true })}
                className="h-24  border border-gray-600 hover:border-gray-500
                 outline-none text-gray-800 rounded-md  p-2
          pl-4 w-full font-light  focus:border-orange-400 "
                placeholder="Write the method step by step..."
              />
              {errors.instructions && <p>Method is required</p>}
            </div>
          </div>
        </div>
        <div className="pb-10">
          <button className="btnRecipe w-full" type="submit">
            Create Recipe
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default create;

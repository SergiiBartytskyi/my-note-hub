import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  initialValues?: NoteFormValues;
  submitLabel?: string;
  onSubmit: (values: NoteFormValues) => Promise<void>;
  onCancel: () => void;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const defaultInitialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(1, 'Title must be at least 1 character')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .min(1, 'Content must be at least 1 character')
    .max(500, 'Content must be at most 500 characters')
    .required('Content is required'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

const NoteForm = ({
  initialValues = defaultInitialValues,
  submitLabel = 'Create note',
  onSubmit,
  onCancel,
}: NoteFormProps) => {
  const fieldId = useId();

  const handleSubmit = async (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
    await onSubmit(values);
    // actions.resetForm();
    actions.setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col text-base font-medium text-slate-700 dark:text-slate-300">
            <label htmlFor={`${fieldId}-title`}>
              Title <sup>*</sup>
            </label>
            <Field
              id={`${fieldId}-title`}
              type="text"
              name="title"
              className="mt-1 rounded-sm border px-3 py-2 text-base resize-none"
            />
            <ErrorMessage name="title" component="span" className="mt-1 text-xs text-red-500" />
          </div>

          <div className="flex flex-col text-base font-medium text-slate-700 dark:text-slate-300">
            <label htmlFor={`${fieldId}-content`}>
              Content <sup>*</sup>
            </label>
            <Field
              as="textarea"
              id={`${fieldId}-content`}
              name="content"
              rows={8}
              className="mt-1 rounded-sm border px-3 py-2 text-base resize-none"
            />
            <ErrorMessage name="content" component="span" className="mt-1 text-xs text-red-500" />
          </div>

          <div className="flex flex-col text-base font-medium text-slate-700 dark:text-slate-300">
            <label htmlFor={`${fieldId}-tag`}>Tag</label>
            <Field
              as="select"
              id={`${fieldId}-tag`}
              name="tag"
              className="mt-1 rounded-sm border px-3 py-2 text-base"
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className="mt-1 text-xs text-red-500" />
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">* must be filled in</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" variant="primary" disabled={!dirty || !isValid || isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;

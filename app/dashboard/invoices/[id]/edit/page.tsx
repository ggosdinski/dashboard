import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: { params: { id: string } }){
  if (!params.id) {
    return <p className="text-red-500">Error: Invoice ID is missing.</p>;
  }

  try {
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(params.id),
      fetchCustomers(),
    ]);

    if (!invoice) {
      notFound();
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Edit Invoice',
              href: `/dashboard/invoices/${params.id}/edit`,
              active: true,
            },
          ]}
        />
        <Form invoice={invoice} customers={customers} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching invoice:', error);
    return <p className="text-red-500">Error loading invoice data.</p>;
  }
}
